// グローバルアセットから特定のフィーチャーコレクションを読み込み
var table = ee.FeatureCollection("projects/ee-forvirgo77/assets/kohakutyo3");
var birdData = ee.FeatureCollection(table);

// MODIS NDVIデータセットから2016年から2019年までのデータを取得し、NDVI値をスケーリング
var modisNDVI = ee
  .ImageCollection("MODIS/006/MOD13Q1")
  .filterDate("2016-01-01", "2019-12-31") // 分析対象の期間を設定
  .select("NDVI")
  .map(function (image) {
    // 各画像のNDVI値を0.0001で乗算して、実際のスケールに変換
    return image.multiply(0.0001).copyProperties(image, ["system:time_start"]);
  });

// データベース内のすべての異なるIDについて繰り返し処理を行い、それぞれのNDVI値を計算
birdData.distinct("ID").evaluate(function (ids) {
  ids.features.forEach(function (id) {
    // 各IDに基づいて、放鳥データと回収データを分離
    var pairData = birdData.filter(ee.Filter.eq("ID", id.properties.ID));
    var releaseData = pairData.filter(ee.Filter.eq("type", "Release"));
    var recoveryData = pairData.filter(ee.Filter.eq("type", "Recovery"));

    // 放鳥点と回収点でのNDVIの平均値を計算
    var releaseNDVI = modisNDVI.mean().reduceRegion({
      reducer: ee.Reducer.mean(), // 平均値の算出
      geometry: releaseData.geometry(), // 放鳥点のジオメトリ
      scale: 250, // 解像度250mで解析
    });

    var recoveryNDVI = modisNDVI.mean().reduceRegion({
      reducer: ee.Reducer.mean(), // 平均値の算出
      geometry: recoveryData.geometry(), // 回収点のジオメトリ
      scale: 250, // 解像度250mで解析
    });

    // 結果をコンソールに表示
    print(
      "Release NDVI for " + id.properties.ID + ": ",
      releaseNDVI.get("NDVI")
    );
    print(
      "Recovery NDVI for " + id.properties.ID + ": ",
      recoveryNDVI.get("NDVI")
    );
  });
});
