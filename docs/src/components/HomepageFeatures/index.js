import clsx from 'clsx'
import Heading from '@theme/Heading'
import styles from './styles.module.css'

const FeatureList = [
  {
    title: 'Fácil de usar',
    Svg: require('@site/static/img/easy.svg').default,
    description: (
      <>
        Celifrut Desktop App es una aplicación diseñada con una interfaz intuitiva, sencilla y
        amigable con el usuario, donde se puede visualizar y procesar la data del proceso.
      </>
    )
  },
  {
    title: 'Información inmediata',
    Svg: require('@site/static/img/data.svg').default,
    description: (
      <>
        Celifrut Desktop App le permite ver y manipular la información del sistema en tiempo real,
        mostrando datos e indicadores en tiempo real, de manera clara y ordenada.
      </>
    )
  },
  {
    title: 'Desarrollado en React',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Celifrut Desktop App esta desarrollado con React y Electron, permitiendo reusar componentes,
        reduciendo en gran medida tiempo de desarrollo.
      </>
    )
  }
]

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  )
}
