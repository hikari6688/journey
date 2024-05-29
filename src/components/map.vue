<template>
  <div class="map-loader">
    <div class="controller">
      <p class="mode-text">当前模式:{{ mode }}</p>
      <div class="mode-btns">
        <el-button type="primary" @click="setCommand('Point')">标点</el-button>
        <el-button type="primary" @click="setCommand('LineString')"
          >画线</el-button
        >
        <el-button type="primary" @click="setCommand('Rectangle')"
          >矩形</el-button
        >
        <el-button type="primary" @click="setCommand('Circle')">圆</el-button>
        <el-button type="primary" @click="setCommand('Polygon')"
          >多边形</el-button
        >
        <!-- <el-button type="primary" @click="setCommand('Point')">测距</el-button>
        <el-button type="primary" @click="setCommand('Point')"
          >测面积</el-button
        > -->
      </div>
    </div>
    <div id="map-container"></div>
  </div>
</template>
<script setup lang="ts">
import alien from "@/assets/icons/alien.png";
import { ref, type Ref, onMounted ,useSlots} from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";
//绘制点线面并编辑 长度测量 面积测量

type commandEnum = "Point" | "LineString" | "Rectangle" | "Polygon" | "Circle";
const pathRef = ref<any>(null);
const mode = ref<commandEnum>("Point");
const AMapUtils: Record<string, any> = {
  map: null,
  AMap: null,
  mouseTool: null,
  PolylineEditor: null, //折线编辑器
  PolygonEditor: null, //多边形编辑器
  rectangleEditor: null, //矩形编辑器
  CircleEditor: null, //圆形编辑器
};

function setCommand(command: commandEnum): void {
  mode.value = command;
  switch (command) {
    case "LineString":
      drawLine();
      break;
    case "Point":
      drawMarker();
      break;
    case "Polygon":
      drawPolygon();
      break;
    case "Rectangle":
      drawRectangle();
      break;
    case "Circle":
      drawCircle();
      break;
    default:
      break;
  }
}

function drawCircle() {
  const { mouseTool } = AMapUtils;
  mouseTool.circle({
    strokeColor: "#FF33FF",
    strokeOpacity: 1,
    strokeWeight: 6,
    fillColor: "#1791fc",
    fillOpacity: 0.4,
    strokeStyle: "solid",
    // 线样式还支持 'dashed'
    // strokeDasharray: [30,10],
  });
}

function drawRectangle() {
  const { mouseTool } = AMapUtils;
  mouseTool.rectangle({
    strokeColor: "red",
    strokeOpacity: 0.5,
    strokeWeight: 6,
    fillColor: "blue",
    fillOpacity: 0.5,
    // strokeStyle还支持 solid
    strokeStyle: "solid",
    // strokeDasharray: [30,10],
  });
}

function drawLine() {
  const { mouseTool } = AMapUtils;
  const line = mouseTool.polyline({
    strokeColor: "#3366FF",
    strokeOpacity: 1,
    strokeWeight: 6,
    // 线样式还支持 'dashed'
    strokeStyle: "solid",
    // strokeStyle是dashed时有效
    // strokeDasharray: [10, 5],
  });
}

function drawMarker() {
  const { AMap, mouseTool } = AMapUtils;
  const icon = AMap.Icon({
    // size: new AMap.Size(30, 30),
    // image: alien,
    // imageSize: new AMap.Size(30, 30),
  });
  mouseTool.marker({});
}

function drawPolygon() {
  const { mouseTool } = AMapUtils;
  mouseTool.polygon({
    strokeColor: "#FF33FF",
    strokeOpacity: 1,
    strokeWeight: 6,
    fillColor: "#1791fc",
    fillOpacity: 0.4,
    // 线样式还支持 'dashed'
    strokeStyle: "solid",
    // strokeStyle是dashed时有效
    // strokeDasharray: [30,10],
  });
}

async function loadMap() {
  AMapUtils.AMap = await AMapLoader.load({
    key: "48df892979bff35a684a801b744baa05", // 申请好的Web端开发者Key，首次调用 load 时必填
    version: "2.0", // 指定要加载的 JS API 的版本，缺省时默认为 1.4.15
    plugins: [
      "AMap.ToolBar",
      "AMap.Polyline",
      "AMap.moveAnimation",
      "AMap.RectangleEditor",
      "AMap.MouseTool",
      "AMap.PolylineEditor",
    ], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  });
  AMapUtils.map = new AMapUtils.AMap.Map(
    document.querySelector("#map-container"),
    {
      mapStyle: "amap://styles/fresh", //设置地图的显示样式
      center: [116.434381, 39.898515],
      zoom: 14,
    }
  );
  AMapUtils.mouseTool = new AMapUtils.AMap.MouseTool(AMapUtils.map);
  AMapUtils.mouseTool.on("draw", function (event:any) {
    // event.obj 为绘制出来的覆盖物对象
    const { obj } = event;
    const { className } = obj;
    if (className === "Overlay.Polyline") {
      const polyEditor = new AMapUtils.AMap.PolylineEditor(AMapUtils.map, obj);
      obj.on("dblclick", () => {
        const { _editing } = polyEditor;
        polyEditor.setTarget(obj);
        if (!_editing) polyEditor.open();
        else polyEditor.close();
      });
    }
    AMapUtils.mouseTool.close();
  });
}

onMounted(() => {
  loadMap();
  const slots = useSlots();
  console.log({slots})
});
</script>
<style lang="scss">
.map-loader {
  height: 100%;
  width: 100%;
  .controller {
    margin-bottom: 20px;
    .mode-text {
      margin-bottom: 10px;
      font-size: 20px;
      color: #fff;
    }
    .mode-btns {
      display: flex;
    }
  }
  #map-container {
    height: 100%;
    width: 100%;
  }
}
</style>
