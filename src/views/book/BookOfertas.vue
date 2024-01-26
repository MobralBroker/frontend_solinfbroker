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
              console.log(this.vetorOrderns)
            }            
          } catch(error){
            console.log(error)
          }
    },

    async getProfile(){
      const email = localStorage.getItem('userMail')
      const response = await service.getUserProfile(email);
      console.log(response)
      try{
        this.userProfile = {   
            id: response.id,
            nomeUsuario: response.nomeUsuario,
            saldo: response.saldo,
            email: response.email
        }
        console.log(this.userProfile)
      } catch(error){
        console.log(error)
      }
      
    },

    async wsSocket() {
    const token = localStorage.getItem('token');
    document.cookie = 'X-Authorization=' + token + '; path=/';
    this.connection = new WebSocket("ws://localhost:8086/chat");

    this.connection.onopen = (event) => { // Usando arrow function
      console.log(event);
      console.log("WS conectado");
    };

    this.connection.onmessage = (event) => { // Usando arrow function
      var jsonObj = JSON.parse(event.data);

      console.log("vetorOrderns :::::", this.vetorOrderns);
      console.log("jsonObj :::::", jsonObj);
      console.log("event.data :::::", event.data);
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
    this.listarAllOrdens();
    this.wsSocket();

  },

}
</script>
