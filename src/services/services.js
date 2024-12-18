import Global from "./../Global"
import axios from "axios";

class serviceProfile {

    constructor() {
        this.token = null;
    }
    //SE NECESITA TOKEN
    getPerfilUsuario() {
        return new Promise((resolve) => {
            let usuario = null;
            let request = "api/Usuarios/Perfil";
            let url = Global.api + request;
            axios.get(url, {
                headers: {
                    // TODAVIA NO ESTA IMPLEMENTADA LA FUNCION getToken
                    'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRGF0YSI6ImJYcDBWdUkrYzAvYUVQTDUySmk2dXF0QjhxT2RwUmNoZ1dRTVI0T2NXWHNtZUZKcDRmdlNuaW5wQXNwRys5M3JqYm40YzdjYmQxM3pXN3hOcnRVakZ3N01kNVBrekxoeFpDUzFGQUdPT0prMG0wUDhhR1I3UTkvMGFPS1JwT29KZ0YzejNBTytZNjBoYmZIb0J3QlVqaVpTOXdSTXhJQzI5TTlGMDZ5Z1kvMk5ENWZSS29ETnB0TnZ6UnV4a1RtTjloN1dFVlIyL29jN1krc2ZHWGJjZE03RHpkMlVyU2ZUM0Y3TUwwMFRTQ056V1NHYnh4Uk92TWt3V3JFRDYraElqNTBUSkMxckpEaXh5Z3pJSkNmZUV1eEJxb3JORlZQSFAwZkpjQk9WTzhhMEVwQUJhV0ZFRXNQbVk2RHpwdW10Wm44TEZZbWZxWTBjL250SUU0M3RadWVTYXJCbzZXQW9ONW1KQlhwWWRwbW9yZ2daZW83VkVKcmozREFjOFBzdUtxRjBjaXlCN0VsUTZLWEtPcElvaE5RVlNNQjJnZmhEZmx5N3U1V3U2Z0hvS01ITUE2cmpkUkV6MHU2eG9QbjRMN1pJdGJIdEkvb2Q3QVFDWklxc0c4SW90MHpVYktnVjR1dUpIN3BmUW4yMjY0Y2ZYdFI4VEd2ZlV5U1JNazkrIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQUxVTU5PIiwibmJmIjoxNzM0NTQ3Mzc0LCJleHAiOjE3MzQ1NjE3NzQsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjcwMzIvIiwiYXVkIjoiQXBpQ2hhcmxhc1RlY25pY2FzQ29yZU9BdXRoIn0.5HpYdtNCTCalC1f_f_vFbNv-PuKDSK7VQe3ccJi-Cvg'
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
                'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRGF0YSI6ImdyczhTYW5Gc09KQ0p0YlhkZEk2UUQ2a0NzNGlCUlo0VEcwQXVxQjhWUmplRTRpUXA0aVlLQ3pXVHN1c0x0bk93blg5ZTBkalJYMHovVTFmUnpqQVJPRUhPTGZLSDdHRUVKc2RhYVBDc2ZheDJEcGZPak4vcXF2S1FRay8xRVVqRWNFdjZ1dDRSMlZuTTNXeWE4dEhRVWkzMldjSGtXTWVBYzFLYXBYOXB2MmtNMlFaUnFkWmZUVnM1c3Z3Q2tiOEduNlBRVFZtQkllZ1NFOTM2QzR5R0NuRmJESkxkbWVmNXdhWThMZGFLYy9oZStxYllCVTZaTnVjTm9iYjJFdEZ5ME4rUXJNck9tSjQzNFpsMWxWYUpKUE9VRitkS3JBQlo5dlZYZkxMK1dubTIxcGFOZEV1dUhNMzlzRUM3SW1uIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjpbIkFETUlOSVNUUkFET1IiLCJQUk9GRVNPUiIsIkFMVU1OTyJdLCJuYmYiOjE3MzQ1NTA2ODMsImV4cCI6MTczNDU2NTA4MywiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzAzMi8iLCJhdWQiOiJBcGlDaGFybGFzVGVjbmljYXNDb3JlT0F1dGgifQ.qWHLQqnLx62aOSWH0teC_KasXL7rBa7AMRRmI5SVxfk'
            },
        }).then(response => response.data);
    }
}


export default new serviceProfile;