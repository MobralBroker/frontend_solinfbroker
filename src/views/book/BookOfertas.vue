<template>
  <div>
      <CCol :md="12">
        
        <CCard class="mb-4">
          <CTable align="middle" class="mb-0 border" hover responsive>
              <CTableHead class="text-nowrap">
                <CTableRow>
                  <CTableHeaderCell class="bg-body-secondary text-center" > ID </CTableHeaderCell>
                  <CTableHeaderCell class="bg-body-secondary text-center"> Ativo </CTableHeaderCell>
                  <CTableHeaderCell class="bg-body-secondary text-center"> Quantidade </CTableHeaderCell>
                  <CTableHeaderCell class="bg-body-secondary text-center"> Tipo</CTableHeaderCell>
                  <CTableHeaderCell class="bg-body-secondary text-center"> Valor </CTableHeaderCell>
                  <CTableHeaderCell class="bg-body-secondary text-center"> Data </CTableHeaderCell>
                  <CTableHeaderCell class="bg-body-secondary text-center"> Status </CTableHeaderCell>
                  <CTableHeaderCell class="bg-body-secondary text-center">  </CTableHeaderCell>

                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow v-for="item in vetorOrderns" :key="item.id"  >
                <CTableDataCell class="text-center text-bold"> <div style="font-weight: bold;">{{ item.id }} </div> </CTableDataCell>
                <CTableDataCell class="text-center"> <div> {{ item.sigla }} </div> </CTableDataCell>
                <CTableDataCell class="text-center"> <div class="fw-semibold">{{ item.quantidadeOrdem }}</div> </CTableDataCell>
                <CTableDataCell> <div class="fw-semibold text-nowrap text-center "> <CBadge :color="getColorByType(item.tipoOrdem)"> {{ getTypeByType(item.tipoOrdem) }} </CBadge> </div> </CTableDataCell>
                <CTableDataCell> <div class="fw-semibold text-nowrap text-center ">{{ item.valorOrdem }} </div> </CTableDataCell>
                <CTableDataCell> <div class="fw-semibold text-nowrap text-center ">{{ item.dataLancamento }} </div> </CTableDataCell>
                <CTableDataCell> <div class="fw-semibold text-nowrap text-center "> <CBadge :color="getColorByStatus(item.statusOrdem)"> {{ item.statusOrdem }} </CBadge> </div> </CTableDataCell>                

              </CTableRow>
              </CTableBody>
              
            </CTable>
        </CCard>
      </CCol>
  
  </div>
</template>

<script>

import service from '../../service/controller';

export default {
  name: 'Dashboard',
  components: {
    
  },
  data() {
    
    return {
          orderSellandBuy: {
                    idCliente:'',
                    idAtivo: '', 
                    tipoOrdem: '',
                    valorOrdem: '',
                    quantidadeOrdem: null
          },

          vetorOrderns: [],
          vetorAtivos: [],
          userProfile: {
          },

          objCancelaOrderm: {
            idCliente: localStorage.getItem('idCliente'),
            idAtivo: null,
            tipoOrdem: null,
            valorOrdem: null,
            quantidadeOrdem: null

          },
    }
  },
  methods:{
    getColorByStatus(status) {
      switch (status) {
        case 'CANCELADA':
          return 'warning'; // substitua 'status1' pela condição real
        case 'ABERTA':
          return 'success'; // substitua 'status2' pela condição real
        default:
          return 'secondary'; // cor padrão para outros casos
      }
    },

    getTypeByType(tipoOrdem) {
      switch (tipoOrdem) {
        case 'ORDEM_VENDA':
          return 'Compra'; // substitua 'status1' pela condição real
        case 'ORDEM_COMPRA':
          return 'Venda'; // substitua 'status2' pela condição real
        default:
          return 'null'; // cor padrão para outros casos
      }
    },
    getColorByType(tipoOrdem) {
      switch (tipoOrdem) {
        case 'ORDEM_VENDA':
          return 'info'; // substitua 'status1' pela condição real
        case 'ORDEM_COMPRA':
          return 'success'; // substitua 'status2' pela condição real
        default:
          return 'null'; // cor padrão para outros casos
      }
    },
   
    async listarAllOrdens(){
      try{
            const listOderns = await service.getAllOrders()
            if (Array.isArray(listOderns)) {
              this.vetorOrderns = listOderns.map(ordem => {   
                return {
                    id: ordem.id,
                    idAtivo: ordem.idAtivo,
                    dataLancamento: ordem.dataLancamento,
                    sigla: ordem.ativo.sigla,
                    idCliente: ordem.idCliente,
                    quantidadeOrdem: ordem.quantidadeOrdem,
                    statusOrdem: ordem.statusOrdem,
                    tipoOrdem: ordem.tipoOrdem,
                    valorOrdem: ordem.valorOrdem
                };
              });
              //console.log(this.vetorOrderns)
            }            
          } catch(error){
            console.log(error)
          }
    },

    async getProfile(){
      const email = localStorage.getItem('userMail')
      const response = await service.getUserProfile(email);
      try{
        this.userProfile = {   
            id: response.id,
            nomeUsuario: response.nomeUsuario,
            saldo: response.saldo,
            email: response.email
        }
      } catch(error){
        console.log(error)
      }
      
    },

    async Ativos(){
          try{
              const response = await service.getAtivos();
              if (Array.isArray(response)) {

                this.vetorAtivos = response.map(item => {   
                  return {
                    id: item.id,
                    sigla: item.sigla,
                    nome: item.nome,
                    atualizacao: item.atualizacao,
                    quantidadesPapeis: item.quantidadesPapeis,
                    valorMax: item.valorMax,
                    valorMin: item.valorMin,
                    valor: item.valor
                  };
                });
              }            
            } catch(error){
              console.log(error)
            }
    },

    getDateTime(){

      const currentDate = new Date();
      const timestamp = currentDate.getTime();
      const data = new Date(timestamp);

      const ano = data.getFullYear();
      const mes = String(data.getMonth() + 1).padStart(2, '0');
      const dia = String(data.getDate()).padStart(2, '0');
      const hora = String(data.getHours()).padStart(2, '0');
      const minuto = String(data.getMinutes()).padStart(2, '0');
      const segundo = String(data.getSeconds()).padStart(2, '0');
      const milissegundo = String(data.getMilliseconds()).padStart(3, '0');
      const dataLancamento = `${ano}-${mes}-${dia}T${hora}:${minuto}:${segundo}.${milissegundo}`;
      
      return dataLancamento
    },

    getSigla(id){

      if (Array.isArray(this.vetorAtivos)) {
        for (const item of this.vetorAtivos) {
            if (item.id === id){
              return item.sigla
            }
        }
      }
      return ''

    },

    async wsSocket() {
    const token = localStorage.getItem('token');
    document.cookie = 'X-Authorization=' + token + '; path=/';
    this.connection = new WebSocket("ws://localhost:8086/chat");

    this.connection.onopen = (event) => { 
      console.log("WS conectado");
    };

    this.connection.onmessage = (event) => { 
      var jsonObj = JSON.parse(event.data); 
      
      if (Array.isArray(this.vetorOrderns)) {
      const index = this.vetorOrderns.findIndex(ordem => ordem.id === jsonObj.id);

      if (index !== -1) {
          const updateOrdem = {
          id: jsonObj.id,
          idAtivo: jsonObj.id_ativo,
          dataLancamento: this.getDateTime(),
          sigla: this.getSigla(jsonObj.id_ativo),
          idCliente: jsonObj.id_cliente,
          quantidadeOrdem: jsonObj.quantidade_ordem,
          statusOrdem: jsonObj.status_ordem,
          tipoOrdem: jsonObj.tipo_ordem,
          valorOrdem: jsonObj.valor_ordem
        };
        this.vetorOrderns.splice(index, 0, updateOrdem);

      } else {
        const novaOrdem = {
          id: jsonObj.id,
          idAtivo: jsonObj.id_ativo,
          dataLancamento: this.getDateTime(),
          sigla: this.getSigla(jsonObj.id_ativo), 
          idCliente: jsonObj.id_cliente,
          quantidadeOrdem: jsonObj.quantidade_ordem,
          statusOrdem: jsonObj.status_ordem,
          tipoOrdem: jsonObj.tipo_ordem,
          valorOrdem: jsonObj.valor_ordem
        };
        this.vetorOrderns.push(novaOrdem);
      }
  }



      

    };

    this.connection.onerror = (event) => { // Usando arrow function
      console.error("Erro no WebSocket:", event);
    };

    this.connection.onclose = (event) => { // Usando arrow function
      console.log("Conexão WS fechada:", event);
    };
  }

  },

  /*  FINISH FUNC'S    */

  mounted() {
    this.getProfile();
    this.Ativos();
    this.listarAllOrdens();
    this.wsSocket();

  },

}
</script>
