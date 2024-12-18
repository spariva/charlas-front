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
}

export default new serviceProfile;