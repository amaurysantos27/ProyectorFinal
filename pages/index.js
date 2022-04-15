// Importar React, {useState} desde "react"

import React, { useState } from "react";

// Importar ComponenteTitulo desde "./components/Titulo"
import Titulo from "./components/titulo";

// Importar fnNumeral desde "numeraljs"
import numeral from "numeraljs";

const Index = () => {
  // crear_estado tamano && crear_set_estado setTamano
  const [tamano, setTamano] = useState(100);

  // crear_estado buscar && crear_set_estado setBuscar
  const [buscar, SetBuscar] = useState(0);

  // crear_estado resultado && crear_set_estado setResultado
  const [resultados, setResultados] = useState([]);

  // variable GenerarArray = Generar Arreglos de Numeros Aleatorios con longitud de estado_tamano
  const GenerarArray = new Array(Number(tamano))
    .fill(undefined)
    .map((e, i) => i + 1)
    .sort(() => Math.random() - 0.5);

  /*
    funcionEjecutar() {
      variable algoritmos = Arreglo [
        objecto: {
          colorTexto: verde,
          nombre: "Burbuja",
          funcion: Burbuja,
          parametros: {arreglo: GenerarArray}
        },
        objecto: {
          colorTexto: blue,
          nombre: "QuickSort",
          funcion: QuickSort,
          parametros: {arreglo: GenerarArray}
        },
        objecto: {
          colorTexto: red,
          nombre: "Seleccion",
          funcion: Seleccion,
        },
        objecto: {
          colorTexto: pink,
          nombre: "binarySearch",
          funcion: binarySearch,
        },
      ]
    }
   */
  function Ejecutar() {
    const algoritmos = [
      {
        color: "text-green-500",
        name: "burbuja",
        fn: Burbuja,
        params: { array: GenerarArray },
      },
      {
        color: "text-blue-500",
        name: "QuickSort",
        fn: QuickSort,
        params: { array: GenerarArray },
      },
      {
        color: "text-red-500",
        name: "insertionSort",
        fn: insertionSort,
        params: { array: GenerarArray },
      },
      {
        color: "text-pink-500",
        name: "binarySearch",
        fn: binarySearch,
        params: { array: GenerarArray, element: Number(buscar) },
      },
      {
        color: "text-yellow-500",
        name: "busquedaSecuencial",
        fn: busquedaSecuencial,
        params: { array: GenerarArray, element: Number(buscar) },
      },
    ].map(({ fn, params, name, color }) => {
      var t0 = window.performance.now();
      fn({ ...params });
      var t1 = window.performance.now();

      const time = t1 - t0;
      return (
        <label key={name} className="p-3 m-1 font-bold text-white ">
          <strong>Algoritmo {name}</strong>{" "}
          <strong className={color}>
            {numeral(time).format("0,0.0000000")}
            <strong className="ml-2 text-white">ms</strong>{" "}
          </strong>
        </label>
      );
    });
    setResultados(algoritmos);
  }

  /*
   function busquedaSecuencial ({parametro element, parametro array}) 
   para(asignar i en array) 
      si (element == array[i]) 
        retornar i
      fin si
    fin para
    fin funcion
    
   */

  const busquedaSecuencial = ({ element, array }) => {
    for (let i in array) {
      if (array[i] == element) return i;
    }
    return -1;
  };

  /*
  funcion Burbuja(parametroObjecto array) 
    crear_variable n e inicializarla en 0
    crear_variable i e inicializarla en 0
    crear_variable j e inicializarla en 0
    crear variable 

    asignar n = array_longitud 

    para(asignar k = 1; mientras k < n; sumar 1 a k) 
      para(asignar i = 0; mientras i < n - k; sumar 1 a i) 
        si(array[i] > array[i + 1]) 
          asignar aux = array[i]
          asignar array[i] = array[i + 1]
          asignar array[i + 1] = aux
        fin si
      fin para
    fin para
    retornar array
  fin funcion
*/

  function Burbuja({ array }) {
    let n, i, k, aux;
    n = array.length;

    for (k = 1; k < n; k++) {
      for (i = 0; i < n - k; i++) {
        if (array[i] > array[i + 1]) {
          aux = array[i];
          array[i] = array[i + 1];
          array[i + 1] = aux;
        }
      }
    }

    return array;
  }



  /* funcion binarySearch ({parametro element, parametro array}) 
    crear_variable first e inicializarla en 0
    crear_variable last e inicializarla en array 
    crear_variable position e inicializarla en el tamaño del arreglo
    crear_variable found e inicializarla en falso
    crear_variable middle   
    
    mientras(!found && first <= last) 
      asignar middle = (first + last) / 2
      si(element == array[middle])
        asignar found = true
        asignar position = middle
      sino si(element < array[middle])
        asignar last = middle - 1
      sino 
        asignar first = middle + 1
      fin si
    fin mientras
    retornar position
  fin funcion
  
  
  */

  function binarySearch({ element, array }) {
    let first = 0;
    let last = array.length - 1;
    let position = -1;
    let found = false;
    let middle;

    while (found === false && first <= last) {
      middle = Math.floor((first + last) / 2);
      if (array[middle] == element) {
        found = true;
        position = middle;
      } else if (array[middle] > element) {

        last = middle - 1;
      } else {

        first = middle + 1;
      }
    }
    return position;
  }

  /*
    funcion QuickSort(parametroObjecto array)
    si(array_longitud < 2)
      retornar array
    fin si
    
    crear_variable pivot e inicializarla en array[0]
    crear_variable leftArray e inicializarla en array
    crear_variable rightArray e inicializarla en array
    
    para(asignar i = 1; i < array_longitud; sumar 1 a i)
      si(array[i] < pivot)
        agregar array[i] a leftArray
      sino
        agregar array[i] a rightArray
      fin si
    fin para
    
    retornar concatenar(QuickSort(leftArray), [pivot], QuickSort(rightArray))
  fin funcion
  
      
   
   
   */

  function QuickSort({ array = [] }) {
    if (array.length <= 1) {
      return array;
    }

    const pivot = array[array.length - 1];
    const leftArr = [];
    const rightArr = [];

    for (let i = 0; i < array.length - 1; i++) {
      if (array[i] < pivot) {
        leftArr.push(array[i]);
      } else {
        rightArr.push(array[i]);
      }
    }

    return [...QuickSort(leftArr), pivot, ...QuickSort(rightArr)];
  }


  /*

  funcion insertionSort(parametroObjecto array)
    para(asignar i = 1; i < array_longitud; sumar 1 a i)
      asignar aux = array[i]
      asignar j = i - 1
      mientras(j >= 0 && array[j] > aux)
        asignar array[j + 1] = array[j]
        asignar j = j - 1
      fin mientras
      asignar array[j + 1] = aux
    fin para
    retornar array
  fin funcion

  
  */
  const insertionSort = ({ array }) => {
    const l = array.length;
    let j, temp;

    for (let i = 1; i < l; i++) {
      j = i;
      temp = array[i];
      while (j > 0 && array[j - 1] > temp) {
        array[j] = array[j - 1];
        j--;
      }
      array[j] = temp;
    }

    return array;
  };

  return (
    <div className="p-24 bg-slate-900">
      <Titulo />
      <div className="flex justify-center mt-5">
        <div className="container flex justify-center p-16 my-2 rounded-lg bg-slate-800">
          <div className="mt-7">
            <div className="m-8 border border-blue-800 rounded-lg shadow-xl py-11 opacity-90 bg-slate-800 p-9">
              <form className="rounded-lg bg-slate-300 p-9">
                <div className="w-full px-3 ">
                  <label className="mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase ">
                    Tamaño del vector
                  </label>
                  <input
                    className="block px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-blue-500 rounded appearance-none focus:outline-none focus:bg-white"
                    type="number"
                    onChange={(e) => setTamano(e.target.value)}
                  />
                </div>

                <div className="w-full px-3 mb-6 ">
                  <label className="mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase ">
                    Valor a buscar
                  </label>
                  <input
                    className="block px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-blue-500 rounded appearance-none focus:outline-none focus:bg-white"
                    type="number"
                    onChange={(e) => SetBuscar(e.target.value)}
                  />
                </div>
              </form>
              <div className="flex justify-center mt-4">
                <button
                  onClick={Ejecutar}
                  className="px-8 py-2 font-bold text-white bg-blue-700 border border-blue-700 rounded hover:bg-blue-500"
                >
                  Ejecutar
                </button>
              </div>
            </div>
          </div>
          <div className="p-4 m-8 rounded-lg">
            <h2 className="mb-4 text-2xl font-bold text-center text-white">
              Tiempo
            </h2>
            <div className="flex flex-col mb-4 space-y-5 rounded-lg bg-slate-700 p-9">
              {!resultados.length && (
                <p className="font-bold text-white">
                  No hay tiempos para mostrar
                </p>
              )}
              {resultados.map((resultado, i) => (
                <div key={i}>{resultado}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
