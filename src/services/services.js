import Global from "./../Global"
import axios from "axios";

class serviceProfile {

    constructor() {
        this.token = null;
    }
    //SE NECESITA TOKEN

    getToken(){
        this.token = localStorage.getItem('token');
    }

    getPerfilUsuario() {
        return new Promise((resolve) => {
            let usuario = null;
            let request = "api/Usuarios/Perfil";
            let url = Global.api + request;
            this.getToken();

            axios.get(url, {
                headers: {
                    // TODAVIA NO ESTA IMPLEMENTADA LA FUNCION getToken
                    'Authorization': 'Bearer ' + this.token
                }
            }).then(response => {
                usuario = response.data;
                console.log(usuario);
                resolve(usuario);
            })
        })
    }

    //todas las charlas
    getCharlas() {
        const request = "api/charlas";
        const url = Global.api + request;

        return axios.get(url, {
            headers: {
                'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRGF0YSI6ImdyczhTYW5Gc09KQ0p0YlhkZEk2UUQ2a0NzNGlCUlo0VEcwQXVxQjhWUmplRTRpUXA0aVlLQ3pXVHN1c0x0bk93blg5ZTBkalJYMHovVTFmUnpqQVJPRUhPTGZLSDdHRUVKc2RhYVBDc2ZheDJEcGZPak4vcXF2S1FRay8xRVVqRWNFdjZ1dDRSMlZuTTNXeWE4dEhRVWkzMldjSGtXTWVBYzFLYXBYOXB2MmtNMlFaUnFkWmZUVnM1c3Z3Q2tiOEduNlBRVFZtQkllZ1NFOTM2QzR5R0NuRmJESkxkbWVmNXdhWThMZGFLYy9oZStxYllCVTZaTnVjTm9iYjJFdEZ5ME4rUXJNck9tSjQzNFpsMWxWYUpKUE9VRitkS3JBQlo5dlZYZkxMK1dubTIxcGFOZEV1dUhNMzlzRUM3SW1uIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjpbIkFETUlOSVNUUkFET1IiLCJQUk9GRVNPUiIsIkFMVU1OTyJdLCJuYmYiOjE3MzQ2MDgwMDAsImV4cCI6MTczNDYyMjQwMCwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzAzMi8iLCJhdWQiOiJBcGlDaGFybGFzVGVjbmljYXNDb3JlT0F1dGgifQ.84iu5EqCv5WcdOvx819HyUBYurpWjhDxG32STEUbP_8'
            },
        }).then(response => response.data);
    }

    //get rondas
    getRondas() {
        const request = "api/rondas";
        const url = Global.api + request;

        return axios.get(url, {
            headers: {
                'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRGF0YSI6ImdyczhTYW5Gc09KQ0p0YlhkZEk2UUQ2a0NzNGlCUlo0VEcwQXVxQjhWUmplRTRpUXA0aVlLQ3pXVHN1c0x0bk93blg5ZTBkalJYMHovVTFmUnpqQVJPRUhPTGZLSDdHRUVKc2RhYVBDc2ZheDJEcGZPak4vcXF2S1FRay8xRVVqRWNFdjZ1dDRSMlZuTTNXeWE4dEhRVWkzMldjSGtXTWVBYzFLYXBYOXB2MmtNMlFaUnFkWmZUVnM1c3Z3Q2tiOEduNlBRVFZtQkllZ1NFOTM2QzR5R0NuRmJESkxkbWVmNXdhWThMZGFLYy9oZStxYllCVTZaTnVjTm9iYjJFdEZ5ME4rUXJNck9tSjQzNFpsMWxWYUpKUE9VRitkS3JBQlo5dlZYZkxMK1dubTIxcGFOZEV1dUhNMzlzRUM3SW1uIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjpbIkFETUlOSVNUUkFET1IiLCJQUk9GRVNPUiIsIkFMVU1OTyJdLCJuYmYiOjE3MzQ2MDgwMDAsImV4cCI6MTczNDYyMjQwMCwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzAzMi8iLCJhdWQiOiJBcGlDaGFybGFzVGVjbmljYXNDb3JlT0F1dGgifQ.84iu5EqCv5WcdOvx819HyUBYurpWjhDxG32STEUbP_8'
            },
        }).then(response => response.data);
    }

    //get estados de las charlas para filtrar por estado
    getEstadoCharla() {
        const request = "api/estadoscharlas";
        const url = Global.api + request;

        return axios.get(url, {
            headers: {
                'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRGF0YSI6ImdyczhTYW5Gc09KQ0p0YlhkZEk2UUQ2a0NzNGlCUlo0VEcwQXVxQjhWUmplRTRpUXA0aVlLQ3pXVHN1c0x0bk93blg5ZTBkalJYMHovVTFmUnpqQVJPRUhPTGZLSDdHRUVKc2RhYVBDc2ZheDJEcGZPak4vcXF2S1FRay8xRVVqRWNFdjZ1dDRSMlZuTTNXeWE4dEhRVWkzMldjSGtXTWVBYzFLYXBYOXB2MmtNMlFaUnFkWmZUVnM1c3Z3Q2tiOEduNlBRVFZtQkllZ1NFOTM2QzR5R0NuRmJESkxkbWVmNXdhWThMZGFLYy9oZStxYllCVTZaTnVjTm9iYjJFdEZ5ME4rUXJNck9tSjQzNFpsMWxWYUpKUE9VRitkS3JBQlo5dlZYZkxMK1dubTIxcGFOZEV1dUhNMzlzRUM3SW1uIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjpbIkFETUlOSVNUUkFET1IiLCJQUk9GRVNPUiIsIkFMVU1OTyJdLCJuYmYiOjE3MzQ2MDgwMDAsImV4cCI6MTczNDYyMjQwMCwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzAzMi8iLCJhdWQiOiJBcGlDaGFybGFzVGVjbmljYXNDb3JlT0F1dGgifQ.84iu5EqCv5WcdOvx819HyUBYurpWjhDxG32STEUbP_8'
            },
        }).then((response => response.data));
    }

    //filtrar charlas por ronda
    // getCharlasRonda() {
    //     const request = "api/charlas/charlasronda/" + this.props.id;
    //     const url = Global.api + request;
    //     return axios.get(url, {
    //         headers: {
    //             'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRGF0YSI6ImdyczhTYW5Gc09KQ0p0YlhkZEk2UUQ2a0NzNGlCUlo0VEcwQXVxQjhWUmplRTRpUXA0aVlLQ3pXVHN1c0x0bk93blg5ZTBkalJYMHovVTFmUnpqQVJPRUhPTGZLSDdHRUVKc2RhYVBDc2ZheDJEcGZPak4vcXF2S1FRay8xRVVqRWNFdjZ1dDRSMlZuTTNXeWE4dEhRVWkzMldjSGtXTWVBYzFLYXBYOXB2MmtNMlFaUnFkWmZUVnM1c3Z3Q2tiOEduNlBRVFZtQkllZ1NFOTM2QzR5R0NuRmJESkxkbWVmNXdhWThMZGFLYy9oZStxYllCVTZaTnVjTm9iYjJFdEZ5ME4rUXJNck9tSjQzNFpsMWxWYUpKUE9VRitkS3JBQlo5dlZYZkxMK1dubTIxcGFOZEV1dUhNMzlzRUM3SW1uIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjpbIkFETUlOSVNUUkFET1IiLCJQUk9GRVNPUiIsIkFMVU1OTyJdLCJuYmYiOjE3MzQ1NTA2ODMsImV4cCI6MTczNDU2NTA4MywiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzAzMi8iLCJhdWQiOiJBcGlDaGFybGFzVGVjbmljYXNDb3JlT0F1dGgifQ.qWHLQqnLx62aOSWH0teC_KasXL7rBa7AMRRmI5SVxfk'
    //         },
    //     }).then(response => response.data);
    // }
}


export default new serviceProfile;