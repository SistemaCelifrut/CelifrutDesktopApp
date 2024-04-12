/* eslint-disable prettier/prettier */
import { proveedoresType } from "@renderer/types/proveedoresType"
import { PiNotePencilDuotone } from "react-icons/pi";
import { RiDeleteBin5Fill } from "react-icons/ri";

type propsType = {
    data: proveedoresType[]
}
export default function TableProveedores(props: propsType): JSX.Element {
    const headers = ["Codigo", "PREDIO", "ICA", "Limon", "Naranja", "Mandarina", "Departamento", "Proveedores",  "GGN", "Vencimiento GGN", "Acciones"]
    return (
        <table className="table-main">
            <thead>
                <tr>
                    {headers.map(item => (
                        <th key={item}>{item}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {props.data.map((proveedor, index) => (
                    <tr key={proveedor._id} className={`${index % 2 === 0 ? 'fondo-par' : 'fondo-impar'}`} >
                        <td>{proveedor["CODIGO INTERNO"]}</td>
                        <td>{proveedor.PREDIO}</td>
                        <td>{proveedor.ICA}</td>
                        <td>{proveedor.L}</td>
                        <td>{proveedor.N}</td>
                        <td>{proveedor.M}</td>
                        <td>{proveedor.DEPARTAMENTO}</td>
                        <td>{proveedor.PROVEEDORES}</td>
                        <td>{proveedor.GGN}</td>
                        <td>{proveedor["FECHA VENCIMIENTO GGN"]}</td>
                        <td>
                            <button style={{ color: "blue" }}><PiNotePencilDuotone /></button>
                            <button style={{ color: "red" }}><RiDeleteBin5Fill /></button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}