# track_birds

## 概要
このプロジェクトでは、鳥類標識調査の回収記録データを使用して、特定の鳥類の放鳥地点と回収地点の地理的位置を解析します。データは日本の生物多様性情報システム（BioDIC）から取得し、Google Earth Engine (GGE) での地理空間解析に適用します。

趣味であるバードウォッチング✖️衛星データで分析できることはないか、考えていきます。

## データ取得
### ステップ 1: データの取得
1. BioDICの鳥類標識調査ページにアクセスします。
2. 回収記録データをクリックしてアクセスし、特定の鳥種に関するデータのリンクを選択します。
3. 該当する鳥種のページから、KMLファイルをダウンロード。スクリプトの中からKMZファイル（例: https://www.biodic.go.jp/birdRinging/data/narrowarea/Cygnus_columbianus/2019_Cygnus_columbianus.kmz） をダウンロードします。
### ステップ 2: データの変換
1. Google Earth Proを開き、ダウンロードしたKMZファイルをロードします。
2. ファイルをKML形式にエクスポートします。
3. 足環番号, 放鳥緯度経度, 回収緯度経度をcsvにする。(要スクリプト)
## Google Earth Engineでの解析
### ステップ 3: データのアップロードと解析
1. Google Earth EngineのCode Editorにアクセスし、エクスポートしたcsvファイルをアセットとしてアップロードします。
2. アップロードしたKMLデータを基にスクリプトを作成し、放鳥地点と回収地点を地図上に表示します。
3. 放鳥地点と回収地点を結ぶ線を描画し、地理的な移動パターンを分析します。
4. 放鳥点と回収点でのNDVIの平均値を計算し表示します。
