/* eslint-disable prettier/prettier */
import { useState } from 'react'
import { descarteType } from '../types/descartes';

type propsType = {
  procesar: (data: string) => void
  propsModal: { action: string; data: object }
  theme: string
  unCheck: (data: boolean) => void
  reset: () => void
  table: descarteType[]
  setShowSuccess: (e) => void
  setShowError: (e) => void
  setMessage: (e) => void
}

export default function ModalConfirmarProcesoDescarte(props: propsType): JSX.Element {
  const [cliente, setCliente] = useState<string>('')
  const [placa, setPlaca] = useState<string>('')
  const [nombreConductor, setNombreConductor] = useState<string>('')
  const [telefono, setTelefono] = useState<string>('')
  const [cedula, setCedula] = useState<string>('')
  const [remision, setRemision] = useState<string>('')

  const finalizar = async (): Promise<void> => {
    try {
      if (props.propsModal.action === 'Enviar descarte') {
        
        const historial = {
          fecha: new Date(),
          accion: "Salida de fruta",
          cliente: cliente,
          nombreConductor: nombreConductor,
          telefono: telefono,
          cedula: cedula,
          remision: remision,
          predios: {}
        }

        //se eliminan los datos
        const objRequest = {}
        Object.keys(props.propsModal.data).forEach(item => {
          const [id, tipoDescarte, descarte] = item.split("/")
          if (!Object.prototype.hasOwnProperty.call(objRequest, id)) {
            objRequest[id] = {}
          }
          objRequest[id][`inventarioActual.${tipoDescarte}.${descarte}`] = 0;
        });
        // se hace la peticion para poner en 0 los inventarios de los lotes
        for (const item of Object.keys(objRequest)) {
          const enf = props.table.find(id => id._id === item);
          const request = {
            data: {
              lote: {
                ...objRequest[item],
                _id: item,
              }
            },
            collection: 'lotes',
            action: 'putLotes',
            query: 'proceso',
            record: "salidaDescarte"
          };
          await window.api.server(request);
          if (enf) {
            historial.predios[enf?.enf] = {
              descarteLavado: enf?.inventarioActual.descarteLavado,
              descarteEncerado: enf?.inventarioActual.descarteEncerado
            }
          }
          // Puedes manejar la respuesta aquí antes de pasar al siguiente elemento
        }

        // se crea el historial descarte
        const requestHistorial = {
          data: historial,
          collection: 'historialDescartes',
          action: 'addHistorialDescarte',
          query: 'proceso',
          record: 'historialDescarte'
        };
        await window.api.server(requestHistorial)

 
      } else if (props.propsModal.action === 'Reprocesar como Celifrut') {

        // se crea el elemnto historial descarte
        const historial = {
          fecha: new Date(),
          accion: "Reproceso Celifrut",
          cliente: "Celifrut",
          nombreConductor: "N/A",
          telefono: "N/A",
          cedula: "N/A",
          remision: "N/A",
          predios: {}
        }

        //se eliminan los datos
        const kilos = Object.keys(props.propsModal.data).reduce((acu, item) => acu += props.propsModal.data[item], 0);
        const objRequest = {}
        let _id;
        Object.keys(props.propsModal.data).forEach(item => {
          const [id, tipoDescarte, descarte] = item.split("/")
          if (!Object.prototype.hasOwnProperty.call(objRequest, id)) {
            objRequest[id] = {}
            _id = id
          }
          objRequest[id][`inventarioActual.${tipoDescarte}.${descarte}`] = 0;
        });
        const lote = props.table.find(lote => lote._id === _id);
        // se hace la peticion para poner en 0 los inventarios de los lotes
        for (const item of Object.keys(objRequest)) {
          const enf = props.table.find(id => id._id === item);
          const request = {
            data: {
              lote: {
                ...objRequest[item],
                _id: item,
              }
            },
            collection: 'lotes',
            action: 'putLotes',
            query: 'proceso',
            record: "reprocesoCelifrut"
          };
          await window.api.server(request);
          if (enf) {
            historial.predios[enf?.enf] = {
              descarteLavado: enf?.inventarioActual.descarteLavado,
              descarteEncerado: enf?.inventarioActual.descarteEncerado
            }
          }
          // Puedes manejar la respuesta aquí antes de pasar al siguiente elemento
        }
        //se crea el lote Celifrut
        const datos = {
          predio: "65c27f3870dd4b7f03ed9857",
          canastillas: "0",
          kilos: kilos,
          placa: "AAA000",
          tipoFruta: lote?.tipoFruta,
          observaciones: "Reproceso",
          promedio: Number(kilos) / (lote?.tipoFruta === "Naranja" ? 19 : 20),
          inventarioActual: {
            inventario: 0,
            descarteEncerado: { balin: 0, pareja: 0, extra: 0, descarteGeneral: 0 },
            descarteLavado: { balin: 0, pareja: 0, descarteGeneral: 0 },
          },
          descarteLavado: { balin: 0, pareja: 0, descarteGeneral: 0, descompuesta: 0, piel: 0, hojas: 0 },
          descarteEncerado: { balin: 0, pareja: 0, extra: 0, descarteGeneral: 0, descompuesta: 0, suelo: 0 },

        }
        const request = {
          data: datos,
          collection: 'lotes',
          action: 'reprocesoCelifrut',
          query: 'proceso',
          record: 'crearLote'
        };
        await window.api.server(request)

        // se crea el historial descarte
        const requestHistorial = {
          data: historial,
          collection: 'historialDescartes',
          action: 'addHistorialDescarte',
          query: 'proceso',
          record: 'historialDescarte'
        };
        await window.api.server(requestHistorial)
      } else if (props.propsModal.action === 'Reprocesar el lote') {
        const objRequest = {}
        const objRequestDescarte = {}
        let _id;
        Object.keys(props.propsModal.data).forEach(item => {
          const [id, tipoDescarte, descarte] = item.split("/")
          if (!Object.prototype.hasOwnProperty.call(objRequest, id)) {
            objRequest[id] = {}
            _id = id
          }
          objRequest[id][`inventarioActual.${tipoDescarte}.${descarte}`] = 0;
          objRequestDescarte[`${tipoDescarte}.${descarte}`] = 0;
        });
        const lote = props.table.find(lote => lote._id === _id);
        const request = {
          data: {
            lote: {
              ...objRequest[_id],
              ...objRequestDescarte,
              _id: _id,
              enf: lote?.enf,
              predio: {
                _id: lote?.predio._id,
                PREDIO: lote?.predio.PREDIO
              },
              tipoFruta: lote?.tipoFruta
            }
          },
          collection: 'lotes',
          action: 'vaciarLote',
          query: 'proceso',
          record: 'vaciarLote'
        }
        const response = await window.api.server(request)
        if (response.status !== 200) {

          alert('Error al reprocesar predio')
          props.unCheck(false)
          props.procesar('')
        }
      }

      props.setShowSuccess(true)
      props.setMessage("Fruta vaciada!")
      setInterval(() => {
        props.setShowSuccess(false)
      }, 5000)
    } catch (e) {

      props.setShowError(true)
      props.setMessage(`Error: ${e}`)
      setInterval(() => {
        props.setShowError(false)
      }, 5000)
    } finally {
      propsAction()
    }
  }

  const propsAction = (): void => {
    props.unCheck(true)
    props.procesar('')
    props.reset()
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className={`bg-white rounded-xl  w-96 h-auto pb-4 ${props.propsModal.action === 'Enviar descarte' && 'h-60'
          }`}
      >
        <div className="flex justify-between items-center bg-Celifrut-green p-2 rounded-t-xl">
          <h1 className="text-white">
            {props.propsModal.action.charAt(0).toUpperCase() + props.propsModal.action.slice(1)}{' '}
            descarte
          </h1>
        </div>
        <div className="flex justify-center p-2">
          <h2 className="text-center">¿Desea {props.propsModal.action} seleccionado?</h2>
        </div>
        {props.propsModal.action === 'Enviar descarte' && (
          <div className="flex justify-center flex-col p-2">
            <label>Nombre del cliente</label>
            <input
              type="text"
              className="border-2 border-gray-200 rounded-md p-2"
              onChange={(e): void => setCliente(e.target.value)}
            />
            <label >Placa</label>
            <input
              type="text"
              value={placa}
              maxLength={6}
              className="border-2 border-gray-200 rounded-md p-2"
              onChange={(e): void => setPlaca(e.target.value)}
            />
            <label >Nombre conductor</label>
            <input
              type="text"
              className="border-2 border-gray-200 rounded-md p-2"
              onChange={(e): void => setNombreConductor(e.target.value)}
            />
            <label >Telefono</label>
            <input
              type="text"
              className="border-2 border-gray-200 rounded-md p-2"
              onChange={(e): void => setTelefono(e.target.value)}
            />
            <label >Cedula</label>
            <input
              type="number"
              className="border-2 border-gray-200 rounded-md p-2"
              onChange={(e): void => setCedula(e.target.value)}
            />
            <label >Remision</label>
            <input
              type="number"
              className="border-2 border-gray-200 rounded-md p-2"
              onChange={(e): void => setRemision(e.target.value)}
            />

          </div>
        )}
        <div className="flex justify-center gap-4 mt-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={finalizar}>
            Aceptar
          </button>
          <button
            className="border border-gray-300 px-4 py-2 rounded-md"
            onClick={(): void => props.procesar('')}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}
