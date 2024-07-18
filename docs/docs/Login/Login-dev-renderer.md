---
title: Inicio de sesión Desarrollador (Renderer)🚀
description: Documentacion del componente Login
---

## Componente Login

El componente `Login` maneja la interfaz de inicio de sesión en la aplicación, permitiendo a los usuarios autenticarse mediante un formulario interactivo.

### Descripción

El componente utiliza React y está diseñado para ser parte de la interfaz de usuario (UI) de una aplicación, integrando funcionalidades como validación de usuario y contraseña, manejo de errores, y comunicación con el proceso principal de Electron para la autenticación.

### Estructura y Funcionalidad

El componente consta de varios elementos clave:

- **Estado Local (`useState`):**
  - `username`: Almacena el nombre de usuario ingresado.
  - `password`: Almacena la contraseña ingresada.
  - `errUser` y `errPass`: Estados booleanos para gestionar errores de usuario y contraseña respectivamente.

  ```typescript
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [errUser, setErrUser] = useState<boolean>(false)
    const [errPass, setErrPass] = useState<boolean>(false)
  ```

- **Función `handleSubmit`:**
  - Gestiona el envío del formulario de inicio de sesión.
  - Realiza una solicitud asincrónica al proceso principal de Electron utilizando `window.api.user()` con los datos de inicio de sesión (`username` y `password`).
  - Maneja respuestas del servidor para mostrar errores específicos si el usuario o la contraseña son incorrectos.

  ```typescript
    const handleSubmit = async (event): Promise<void> => {
    try {
      if (check) {
        event.preventDefault()
        check = false
        const datosLogIn = {
          user: username,
          password: password,
        }
        const response = await window.api.user(datosLogIn)
        if (response.status === 401) {
          setErrUser(true)
          setTimeout(() => {
            setErrUser(false)
          }, 3000)
        } else if (response.status === 402) {
          setErrPass(true)
          setTimeout(() => {
            setErrPass(false)
          }, 3000)
        }
      }
    } catch (e) {
      console.error(e)
    } finally {
      check = true
    }
  }
  ```

- **Efecto `useEffect`:**
  - Restablece los estados de error (`errUser` y `errPass`) cada vez que cambia el `username` o `password`.

- **Interfaz de Usuario (UI):**
  - Formulario de inicio de sesión con campos de entrada para usuario y contraseña.
  - Muestra mensajes de error si el usuario o la contraseña son incorrectos.
  - Botón "Iniciar" para enviar el formulario.

- **Integración con Recursos Externos:**
  - Importa y muestra un logo (`logo`) ubicado en el directorio de activos (`../../assets/CELIFRUT.png`).
  - Utiliza hojas de estilos CSS (`styles.css` y `main.css`) para el diseño y la presentación del formulario.


Este componente se utiliza para gestionar la autenticación de usuarios en la interfaz de usuario de una aplicación basada en Electron y React. Asegúrate de integrarlo correctamente en tu proyecto y personalizarlo según las necesidades específicas de tu aplicación y diseño visual.