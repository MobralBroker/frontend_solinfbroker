import { authenticationApi, crudApi } from "./api"

export default{
    
    /*   MS-AUTH  */
    async register(data){
        console.log(data)
        const response=await authenticationApi.post('/auth/register', data)
    },

    async login(user){
            
        const response = await authenticationApi.post('auth/login',user)
        return  response.data
          
    },
    
    async getUserProfile(email){
        
        const token = localStorage.getItem('token');        
        if (!token) {
            console.error('Token não encontrado. Faça o login para obter o token.');
            return;
        }
        const response = await authenticationApi.get('/auth/usuario/' + email)
        return response.data;
    },



    /*   MS-CRUD GERAL  */
    async sentOrder(data){
        
        const token = localStorage.getItem('token');        
        if (!token) {
            console.error('Token não encontrado. Faça o login para obter o token.');
            return;
        }

        const response = await crudApi.post('/ordem', data, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
        
    },


    async getAtivos(){
        
        const token = localStorage.getItem('token');        
        if (!token) {
            console.error('Token não encontrado. Faça o login para obter o token.');
            return;
        }
        const response = await crudApi.get('/ativo',{
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
        return response.data;
    },

    async getDeposito(idCliente, val){
       /* cliente/adicionar-saldo/7?valor=2342502 */
       const token = localStorage.getItem('token');
    
       if (!token) {
           console.error('Token não encontrado. Faça o login para obter o token.');
           return;
       }
   
       try {
           const response = await crudApi.put(`/cliente/adicionar-saldo/${idCliente}?valor=${val}`, null, {
               headers: {
                   'Authorization': `Bearer ${token}`,
               },
           });
   
           return response.data;
       } catch (error) {
           console.error('Erro ao realizar saque:', error);
           throw error; // Lançar o erro para que a chamada do getSaque possa lidar com isso, se necessário.
       }
    },

    async getSaque(idCliente, val) {
        const token = localStorage.getItem('token');
    
        if (!token) {
            console.error('Token não encontrado. Faça o login para obter o token.');
            return;
        }
    
        try {
            const response = await crudApi.put(`/cliente/sacar-saldo/${idCliente}?valor=${val}`, null, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
    
            return response.data;
        } catch (error) {
            console.error('Erro ao realizar saque:', error);
            throw error; // Lançar o erro para que a chamada do getSaque possa lidar com isso, se necessário.
        }
    },

    async getSaque(idCliente, val) {
        const token = localStorage.getItem('token');
    
        if (!token) {
            console.error('Token não encontrado. Faça o login para obter o token.');
            return;
        }
    
        try {
            const response = await crudApi.put(`/cliente/sacar-saldo/${idCliente}?valor=${val}`, null, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
    
            return response.data;
        } catch (error) {
            console.error('Erro ao realizar saque:', error);
            throw error; // Lançar o erro para que a chamada do getSaque possa lidar com isso, se necessário.
        }
    },

    async getOrdensClient(idCliente){
        
        const token = localStorage.getItem('token');        
        if (!token) {
            console.error('Token não encontrado. Faça o login para obter o token.');
            return;
        }

        const listOderns = await crudApi.get(`/ordem/cliente/${idCliente}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
        
        return listOderns.data;
    },

    async deleteOrdemClient(idOrdem, ordem){
        
        const token = localStorage.getItem('token');        
        if (!token) {
            console.error('Token não encontrado. Faça o login para obter o token.');
            return;
        }
        try {
            await crudApi.put(`/ordem/cancelar-ordem/${idOrdem}`, ordem,{
            headers: {
                'Authorization': `Bearer ${token}`,
                // 'Content-Type': 'application/json',
                // 'Content-Lengtht': 'calculated when request is sent',
                // 'Host': 'calculated when request is sent',
                // 'Accept': '*/*',
                // 'Accept-Encoding': 'gzip, deflate, br',
                // 'Connection': 'keep-alive',
                },
            
        });
        } catch (error) {
        
        }
    },

    async getAllOrderns(){
        
        const token = localStorage.getItem('token');        
        if (!token) {
            console.error('Token não encontrado. Faça o login para obter o token.');
            return;
        }

        const listOderns = await crudApi.get(`/ordem`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
        
        return listOderns.data;
    },

}

//localhost:8081/ordem/cancelar-ordem/7