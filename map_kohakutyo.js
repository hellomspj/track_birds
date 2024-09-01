// 概要
// このスクリプトは、Google Earth Engine (GEE) を使用して、特定の放鳥データセット（kohakutyo2）からコハクチョウの放鳥点と回収点を視覚化します。
// 各鳥類のペアごとに、放鳥点と回収点を地図上に表示し、両点を結ぶ直線を描画してその移動経路を示します。

// assets import
var table = ee.FeatureCollection("projects/ee-forvirgo77/assets/kohakutyo2");

// CSVファイルからフィーチャーコレクションを作成
var birdData = ee.FeatureCollection(table);

// ユニークなPairIDごとにデータをグループ化して、それぞれのペアをプロット
var uniquePairIDs = birdData.distinct("PairID");

uniquePairIDs.evaluate(function (ids) {
  ids.features.forEach(function (id) {
    var pairData = birdData.filter(
      ee.Filter.eq("PairID", id.properties.PairID)
    );
    var releasePoint = pairData
      .filter(ee.Filter.eq("type", "Release"))
      .geometry();
    var recoveryPoint = pairData
      .filter(ee.Filter.eq("type", "Recovery"))
      .geometry();

    // リリース点と回収点を地図に追加
    Map.addLayer(
      releasePoint,
      { color: "blue" },
      "Release Point " + id.properties.PairID
    );
    Map.addLayer(
      recoveryPoint,
      { color: "red" },
      "Recovery Point " + id.properties.PairID
    );

    // リリース点と回収点を結ぶ線を描画
    var line = ee.Geometry.LineString([
      releasePoint.coordinates(),
      recoveryPoint.coordinates(),
    ]);
    Map.addLayer(
      line,
      { color: "green" },
      "Migration Path " + id.properties.PairID
    );
  });
});

// マップのビューセンターの調整
Map.centerObject(birdData, 3);
