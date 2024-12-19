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
                'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRGF0YSI6IkFCMFRvNEp4QWxRcjc1KzQ1SUJPKytoMnlrUDVFd245Q251Qlh3OFV6bDVha0JIL21LelNGUzkxbSsydGQxb3J5VlVnUnBiakxsU2RuM2pYSkZRQXVzR3JDdGY1Ujd0ekNQc1RiSlFOMU9FRGxjZjRNNjVhQWcvUnRHOVJXcDN4cG9GTkxYUkhiWSt6RERRNlpmQ050M1N1Nnpyejg1TDI3Z3ZjSXd0ckpwM3J5c2RCdXhyZytjSXAwcWN0YmcyU2p0UWFHSGovL2grTWxuVFA5M3RraDVGSy92ZWNtYkV3VjM3MmM2cGlKb3dUYTROWmg0WE4zekkxaitCaU9oeGg3cHl1SmY4eHFKRnZaUjhoWTFUWDNDQmVXVjhJOWxJemVaTSsyQjhkZmdVUUVJaWVBeVBORU5VczFyc09jRzZZeFBhMmFqNHBremNzNEJibGJMTzJFb0dtNjREajFSdy9kRGtMajlueENiS2YvU21GLzQ4d3FKRXh1YnhKUmtrWjcvS2w5U3AyOFp1bDBoNTNIWkxCWFk3cmltdmt0cWVubkc1UkdtTWFIM0NnRStmWGhMY0J2SlJwcVBRU2tFUENUdFptTSt3UFZGZHRzbU1kaVhnOHA2cW4vWlcySGdzYVo4TStWSmVhZE93PSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFMVU1OTyIsIm5iZiI6MTczNDYxMjQ1OSwiZXhwIjoxNzM0NjI2ODU5LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo3MDMyLyIsImF1ZCI6IkFwaUNoYXJsYXNUZWNuaWNhc0NvcmVPQXV0aCJ9.7EpXGHRsO9iFONznYoaBQjVUlRmXnl_tK9aZidb6SsM'
            },
        }).then(response => response.data);
    }

    //get rondas
    getRondas() {
        const request = "api/rondas";
        const url = Global.api + request;

        return axios.get(url, {
            headers: {
                'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRGF0YSI6IkFCMFRvNEp4QWxRcjc1KzQ1SUJPKytoMnlrUDVFd245Q251Qlh3OFV6bDVha0JIL21LelNGUzkxbSsydGQxb3J5VlVnUnBiakxsU2RuM2pYSkZRQXVzR3JDdGY1Ujd0ekNQc1RiSlFOMU9FRGxjZjRNNjVhQWcvUnRHOVJXcDN4cG9GTkxYUkhiWSt6RERRNlpmQ050M1N1Nnpyejg1TDI3Z3ZjSXd0ckpwM3J5c2RCdXhyZytjSXAwcWN0YmcyU2p0UWFHSGovL2grTWxuVFA5M3RraDVGSy92ZWNtYkV3VjM3MmM2cGlKb3dUYTROWmg0WE4zekkxaitCaU9oeGg3cHl1SmY4eHFKRnZaUjhoWTFUWDNDQmVXVjhJOWxJemVaTSsyQjhkZmdVUUVJaWVBeVBORU5VczFyc09jRzZZeFBhMmFqNHBremNzNEJibGJMTzJFb0dtNjREajFSdy9kRGtMajlueENiS2YvU21GLzQ4d3FKRXh1YnhKUmtrWjcvS2w5U3AyOFp1bDBoNTNIWkxCWFk3cmltdmt0cWVubkc1UkdtTWFIM0NnRStmWGhMY0J2SlJwcVBRU2tFUENUdFptTSt3UFZGZHRzbU1kaVhnOHA2cW4vWlcySGdzYVo4TStWSmVhZE93PSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFMVU1OTyIsIm5iZiI6MTczNDYxMjQ1OSwiZXhwIjoxNzM0NjI2ODU5LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo3MDMyLyIsImF1ZCI6IkFwaUNoYXJsYXNUZWNuaWNhc0NvcmVPQXV0aCJ9.7EpXGHRsO9iFONznYoaBQjVUlRmXnl_tK9aZidb6SsM'
            },
        }).then(response => response.data);
    }

    //get estados de las charlas para filtrar por estado
    getEstadoCharla() {
        const request = "api/estadoscharlas";
        const url = Global.api + request;

        return axios.get(url, {
            headers: {
                'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRGF0YSI6IkFCMFRvNEp4QWxRcjc1KzQ1SUJPKytoMnlrUDVFd245Q251Qlh3OFV6bDVha0JIL21LelNGUzkxbSsydGQxb3J5VlVnUnBiakxsU2RuM2pYSkZRQXVzR3JDdGY1Ujd0ekNQc1RiSlFOMU9FRGxjZjRNNjVhQWcvUnRHOVJXcDN4cG9GTkxYUkhiWSt6RERRNlpmQ050M1N1Nnpyejg1TDI3Z3ZjSXd0ckpwM3J5c2RCdXhyZytjSXAwcWN0YmcyU2p0UWFHSGovL2grTWxuVFA5M3RraDVGSy92ZWNtYkV3VjM3MmM2cGlKb3dUYTROWmg0WE4zekkxaitCaU9oeGg3cHl1SmY4eHFKRnZaUjhoWTFUWDNDQmVXVjhJOWxJemVaTSsyQjhkZmdVUUVJaWVBeVBORU5VczFyc09jRzZZeFBhMmFqNHBremNzNEJibGJMTzJFb0dtNjREajFSdy9kRGtMajlueENiS2YvU21GLzQ4d3FKRXh1YnhKUmtrWjcvS2w5U3AyOFp1bDBoNTNIWkxCWFk3cmltdmt0cWVubkc1UkdtTWFIM0NnRStmWGhMY0J2SlJwcVBRU2tFUENUdFptTSt3UFZGZHRzbU1kaVhnOHA2cW4vWlcySGdzYVo4TStWSmVhZE93PSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFMVU1OTyIsIm5iZiI6MTczNDYxMjQ1OSwiZXhwIjoxNzM0NjI2ODU5LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo3MDMyLyIsImF1ZCI6IkFwaUNoYXJsYXNUZWNuaWNhc0NvcmVPQXV0aCJ9.7EpXGHRsO9iFONznYoaBQjVUlRmXnl_tK9aZidb6SsM'
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