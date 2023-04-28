import React, { Component, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

function App() {
  useEffect(() => {
    iniThree();
  }, []);
  const iniThree = () => {
    //初始化方法
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      35,
      window.innerWidth / window.innerHeight,
      1,
      1000
    ); //创建相机
    // camera.position.z = 10;  //设置相机坐标
    camera.position.set(3, 1, 20);
    const container = document.getElementById("container");
    const renderer = new THREE.WebGLRenderer(); //生成渲染实例
    renderer.setSize(window.innerWidth, window.innerHeight); //设置宽高
    renderer.setClearColor("#f3f8f1", 0.5); //背景颜色
    container.appendChild(renderer.domElement); //生成的渲染的实例, 这个要放到对应的dom容器里面

    //const axisHelper = new THREE.AxesHelper(3)
    //scene.add(axisHelper)//插入辅助线长度为2的坐标系

    //长方体
    const geometry = new THREE.BoxGeometry(3, 4, 5); //长宽高
    const material = new THREE.MeshLambertMaterial({
      color: "#AFEEEE",
      // emissive: 0x072534,
    }); //材质
    const cube = new THREE.Mesh(geometry, material); //生成网格，网格上含有位置信息、旋转信息、缩放信息等等, 需要用几何体与材质两个参数, 但其实并不像网上说的必须要有材质, 不传材质也能显示。
    scene.add(cube);

    const orbitControls = new OrbitControls(camera, container);
    //orbitControls.autoRotate = true;
    //orbitControls.target = new THREE.Vector3(0, 0, 0);//控制焦点

    //添加光源
    //自然光
    // const light = new THREE.AmbientLight('blue');
    // scene.add(light)

    //点光源：1、intensity光强。2、distance光源照射的距离, 默认值为0也就是无限。3、visible布尔值, 是否打开光源。4、decay衰减值, 越大衰减速度越快。
    const point_light = new THREE.PointLight("white", 1, 100000);
    point_light.position.set(5, 5, 5);
    scene.add(point_light);

    const animate = function () {
      requestAnimationFrame(animate);
      // orbitControls.update()
      // cube.rotation.x += 0.01;
      // cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();
    // renderer.render(scene, camera);
  };

  return (
    <div id="container"></div> //要渲染的虚拟dom
  );
}

export default App;
