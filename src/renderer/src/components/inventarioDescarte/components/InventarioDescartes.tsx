import TableDescartes from "../tables/TableDescartes";

type propsType = {
    theme: string
    user:string
}

export default function InventarioDescartes(props:propsType) {
  return (
    <div>
        <TableDescartes theme={props.theme} user={props.user}/>
    </div>
  )
}
