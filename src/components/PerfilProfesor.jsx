import React, { Component } from 'react';
import Global from './Global';
import MenuPerfilProfesor from './MenuPerfilProfesor';
import axios from 'axios';


export default class PerfilProfesor extends Component {
    url = Global.urlApiCharlas;

    state = {
        charlas: [],
        perfil: [],
        isEditing: false,  // Para manejar la visibilidad del formulario de edición
        newImage: null,  // Estado para manejar la nueva imagen
    }

    loadPerfil = () => {
        let token = localStorage.getItem('token');
        console.log("Token:", token); // Verificar el token
        if (token) {
            let request = "api/usuarios/perfil";
            axios.get(this.url + request, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => {
                this.setState({
                    charlas: response.data.charlas,
                    perfil: response.data.usuario
                });
            }).catch(error => {
                console.error("Error loading perfil:", error);
            });
        } else {
            console.error("No token found");
        }
    }

    componentDidMount = () => {
        this.loadPerfil();
    }

    toggleEdit = () => {
        this.setState({ isEditing: !this.state.isEditing });
    }

    cambiarDatosPerfil = () => {
        const { perfil } = this.state;
        let token = localStorage.getItem('token');
        console.log("Token:", token);
    
        if (!token) {
            console.error("No se encontró el token de autenticación.");
            return;
        }
    
        const updatedPerfil = {
            idUsuario: perfil.idUsuario,
            nombre: perfil.nombre,
            apellidos: perfil.apellidos,
            email: perfil.email,
            estadoUsuario: perfil.true,
            imagen: perfil.imagen,
            password: perfil.password,
            idRole: perfil.idRole
        }
        let request = "api/usuarios"; 
        console.log(updatedPerfil)   
        axios.put(this.url + request, updatedPerfil, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            console.log(response.data);
            console.log('Perfil actualizado');
            this.loadPerfil();
            this.toggleEdit();
        })
        .catch(error => {
            console.error("Error saving profile changes:", error);
            if (error.response && error.response.status === 401) {
                console.error("Error de autenticación. Verifica tu token.");
            }
        });
    }

    handleCancel = () => {
        this.toggleEdit(); 
    }

    handleImageChange = (event) => {
        const url = event.target.value;
        if (url) {
            this.setState(prevState => ({
                perfil: {
                    ...prevState.perfil, 
                    imagen: url
                }
            }));
        }
    }    

    render() {
        const { perfil, charlas, isEditing } = this.state;

        return (
            <div style={styles.container}>
                <div style={styles.profileHeader}>
                    <img src="https://img.freepik.com/free-vector/gradient-galaxy-background-with-planets_23-2148999869.jpg" alt="Cover" style={styles.coverImage} />
                    <img src={perfil.imagen || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"} alt="Profile" style={styles.profileImage} />
                </div>

                <MenuPerfilProfesor/>

                <div style={styles.profileDetails}>
                    <h1 style={styles.name}>{perfil.nombre} {perfil.apellidos}</h1>
                    <p style={styles.username}>{perfil.email}</p>
                    <p style={styles.bio}>Usuario de Desarrollo Front en Tajamar</p>

                    <div style={styles.stats}>
                        <span style={styles.stat}>ID: {perfil.idUsuario}</span>
                        <span style={styles.stat}>Contraseña: {perfil.password}</span>
                        <span style={styles.stat}>Rol: {perfil.idRole}</span>
                    </div>
                </div>

                <div style={styles.profileDetails3}>
                    <h4>Charlas</h4>
                </div>

                <div style={styles.profileDetails2}>
                    {charlas.length === 0 ? (
                        <p>Cargando charlas...</p>
                    ) : (
                        charlas.map((item) => (
                            <div key={item.charla.idCharla} className="charla-container">
                                <h2 className="charla-title">{item.charla.titulo}</h2>
                                <p className="charla-description"><strong>Descripción:</strong> {item.charla.descripcion}</p>
                                <p className="charla-details"><strong>Tiempo:</strong> {item.charla.tiempo} minutos</p>
                                <p className="charla-details"><strong>Fecha propuesta:</strong> {new Date(item.charla.fechaPropuesta).toLocaleDateString()}</p>
                                <p className="charla-details"><strong>Estado:</strong> {item.charla.idEstadoCharla === 1 ? 'Pendiente' : 'Completada'}</p>
                                <p className="charla-details"><strong>Ronda:</strong> {item.charla.idRonda}</p>
                                <p className="charla-details"><strong>Curso:</strong> {item.charla.nombreCurso}</p>
                            </div>
                        ))
                    )}
                </div>

                {/* Botón Editar perfil */}
                <button style={styles.editButton} onClick={this.toggleEdit}>Editar Perfil</button>

                {/* Pantalla de edición (overlay) */}
                {isEditing && (
                    <div style={styles.overlay}>
                        <div style={styles.editForm}>
                            <button style={styles.backButton} onClick={this.handleCancel}>×</button> {/* Botón "X" para atrás */}
                            <h2>Editar Perfil</h2>
                            <form>
                                <div style={styles.formGroup}>
                                    <label>Nombre:</label>
                                    <input type="text" defaultValue={perfil.nombre} style={styles.inputField} />
                                </div>
                                <div style={styles.formGroup}>
                                    <label>Apellidos:</label>
                                    <input type="text" defaultValue={perfil.apellidos} style={styles.inputField} />
                                </div>
                                <div style={styles.formGroup}>
                                    <label>Email:</label>
                                    <input type="email" defaultValue={perfil.email} style={styles.inputField} />
                                </div>
                                {/* Campo para cambiar la imagen */}
                                <div style={styles.formGroup}>
                                    <label>Url de la imagen:</label>
                                    <input 
                                        type="url"
                                        onChange={this.handleImageChange} 
                                        style={styles.inputField} 
                                    />
                                </div>
                                <div style={styles.formGroup}>
                                    <label>Contraseña:</label>
                                    <input type="password" defaultValue={perfil.password} style={styles.inputField} />
                                </div>
                            </form>
                            <button style={styles.saveButton} onClick={this.cambiarDatosPerfil}>Guardar Cambios</button>
                            <button style={styles.cancelButton} onClick={this.handleCancel}>Atras</button>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}


const styles = {
    container: {
        paddingBottom: '30px',
        color: '#ffffff',
        backgroundColor: 'rgba(38, 28, 80, 0.5)',
        height: '100vh', 
        width: '100%', 
        maxWidth: '1000px', 
        margin: '0 auto', 
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)', 
        fontFamily: 'Arial, sans-serif'
    },
    profileHeader: {
        position: 'relative',
        width: '100%',
        height: '200px',
        backgroundColor: '#1a1a1a',
    },
    coverImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        filter: 'brightness(50%)', 
        borderRadius: '10px', 
    },
    profileImage: {
        position: 'absolute',
        bottom: '-60px',
        left: '20px',
        width: '100px',   
        height: '100px',  
        borderRadius: '50%',
        border: '3px solid #0d0d0d'
    },
    profileDetails: {
        padding: '50px 20px 20px 20px',  
        textAlign: 'center',
        backgroundColor: '#1a1a1a', 
        borderRadius: '10px',
        boxShadow: '0 5px 20px rgba(0, 0, 0, 0.5)', 
    },
    profileDetails2: {
        paddingTop: '10px',
        textAlign: 'center',
        backgroundColor: '#1a1a1a', 
        borderRadius: '10px',
        boxShadow: '0 5px 20px rgba(0, 0, 0, 0.5)',
        overflowY: 'scroll',         
        maxHeight: '500px',          
        scrollbarColor: '#8e44ad #1a1a1a',
        scrollbarWidth: 'thin', 
        height: '460px'     
    },
    profileDetails3: {
        height: '50px',  
        paddingBottom: '40px',  
        paddingTop: '20px',  
        textAlign: 'center',
        backgroundColor: 'rgba(21, 22, 32, 0.5)', 
        borderRadius: '10px',
        boxShadow: '0 5px 20px rgba(26, 28, 110, 0.5)', 
    },
    name: {
        fontSize: '22px',  
        fontWeight: 'bold',
        color: '#ffffff', 
        marginBottom: '5px'  
    },
    username: {
        fontSize: '16px',  
        color: '#b3b3b3',
        marginBottom: '10px'  
    },
    bio: {
        fontSize: '14px',  
        color: '#e6e6e6',
        marginTop: '10px',
        marginBottom: '15px'  
    },
    stats: {
        marginTop: '10px',
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',  
    },
    stat: {
        fontSize: '14px',  
        fontWeight: 'bold',
        color: '#8e44ad',
    },
    editButton: {
        position: 'absolute',   
        right: '20px',
        top: '18%',
        transform: 'translateY(-50%)',
        padding: '3px 8px',
        fontSize: '18px',
        backgroundColor: '#8e44ad',
        color: 'white',
        borderRadius: '10px',
        border: 'none',
        cursor: 'pointer',
        textTransform: 'capitalize',
        letterSpacing: '0.5px',
        width: '150px'
    },
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',  // Fondo más sutil
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    editForm: {
        backgroundColor: 'rgba(34, 4, 32, 0.8)',
        padding: '20px',
        borderRadius: '15px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)',
        textAlign: 'left',
        width: '100%',
        maxWidth: '400px',  // Limitar el ancho para una mejor experiencia
        position: 'relative',  // Esto ayudará a posicionar la "X" dentro del formulario
    },
    formGroup: {
        marginBottom: '5px',  // Reducido para que no quede tanto espacio
        fontSize: '10px',      // Reducido para que el texto sea un poco más pequeño y más cercano

    },
    label: {
        fontSize: '25px',
        color: '#333',
        fontWeight: '300',
        marginBottom: '20%'  // Reducir el espacio debajo de las etiquetas
    },
    inputField: {
        width: '100%',
        padding: '2px',   // Reducir el padding para un input más compacto
        marginTop: '-50px', // Reducir la separación entre el label y el input
        borderRadius: '8px',
        border: '1px solid #ddd',
        fontSize: '20px',
        backgroundColor: '#f7f7f7',
        transition: 'border-color 0.3s ease',
    },
    saveButton: {
        backgroundColor: '#1da1f2',
        color: '#fff',
        padding: '12px 20px',
        borderRadius: '30px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px',
        transition: 'background-color 0.3s ease',
        width: '100%',
        marginTop: '50px',
    },
    cancelButton: {
        backgroundColor: '#1da1f2',
        color: '#fff',
        padding: '12px 20px',
        borderRadius: '30px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px',
        transition: 'background-color 0.3s ease',
        width: '100%',
        marginTop: '50px',
    },
    backButton: {
        position: 'absolute',
        top: '-15px',
        right: '-50px',
        backgroundColor: 'transparent',
        border: 'none',
        color: '#fff',
        fontSize: '50px', // Tamaño de la "X"
        cursor: 'pointer',
        padding: '0',
        fontWeight: 'bold',
    },
};
