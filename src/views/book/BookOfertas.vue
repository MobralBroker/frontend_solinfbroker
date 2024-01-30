<template>
  <div>
      <CCol :md="12">
        
        <CCard class="mb-4">
          <CTable align="middle" class="mb-1 border" hover responsive>
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
                <CTableRow v-for="(item, index) in paginatedItems" :key="index"  >
                <CTableDataCell class="text-center text-bold"> <div style="font-weight: bold;">{{ item.id }} </div> </CTableDataCell>
                <CTableDataCell class="text-center"> <div> {{ item.sigla }} </div> </CTableDataCell>
                <CTableDataCell class="text-center"> <div class="fw-semibold">{{ item.quantidadeOrdem }}</div> </CTableDataCell>
                <CTableDataCell> <div class="fw-semibold text-nowrap text-center "> <CBadge :color="getColorByType(item.tipoOrdem)"> {{ getTypeByType(item.tipoOrdem) }} </CBadge> </div> </CTableDataCell>
                <CTableDataCell> <div class="fw-semibold text-nowrap text-center ">{{ item.valorOrdem }} </div> </CTableDataCell>
                <CTableDataCell> <div class="fw-semibold text-nowrap text-center ">{{ formatarData(item.dataLancamento) }} </div> </CTableDataCell>
                <CTableDataCell> <div class="fw-semibold text-nowrap text-center "> <CBadge :color="getColorByStatus(item.statusOrdem)"> {{ item.statusOrdem }} </CBadge> </div> </CTableDataCell>                

              </CTableRow>
              </CTableBody>
              
            </CTable>
            <CPagination align="center" aria-label="Page navigation example">
                <CPaginationItem @click="mudarPagina('anterior')" :disabled="currentPage === 1">Anterior</CPaginationItem>
                
                <!-- Use v-for para gerar os CPaginationItem dinamicamente -->
                <CPaginationItem v-for="pagina in paginas" :key="pagina" @click="mudarPagina(pagina)" :active="currentPage === pagina">
                  {{ pagina }}
                </CPaginationItem>
                
                <CPaginationItem @click="mudarPagina('proximo')" :disabled="currentPage === totalPages">Próximo</CPaginationItem>
              </CPagination>
        </CCard>
      </CCol>
  
  </div>
</template>

<script>

import service from '../../service/controller';
import  crudEnvioDados  from "../../service/api";
import { CPagination, CPaginationItem } from "@coreui/vue";

export default {
  name: 'book',
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
          currentPage: 1,
          pageSize: 10,
    }
  },
  computed: {
    paginatedItems() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.vetorOrderns.slice(startIndex, endIndex);
    },
    totalPages() {
      console.log(Math.ceil(this.vetorOrderns.length / this.pageSize))
      return Math.ceil(this.vetorOrderns.length / this.pageSize);
    },
    paginas() {
      const paginas = [];
      for (let i = 1; i <= this.totalPages; i++) {
        paginas.push(i);
      }
      return paginas;
    },
  },
  methods:{
    mudarPagina(destino) {
      if (destino === 'anterior') {
        this.currentPage = Math.max(1, this.currentPage - 1);
      } else if (destino === 'proximo') {
        this.currentPage = Math.min(this.totalPages, this.currentPage + 1);
      } else {
        this.currentPage = destino;
      }
    },
    onPageChange(newPage) {
      this.currentPage = newPage;
    },
    getColorByStatus(status) {
      switch (status) {
        case 'CANCELADA':
          return 'secondary'; // substitua 'status1' pela condição real
        case 'ABERTA':
          return 'warning'; // substitua 'status2' pela condição real
        default:
          return 'success'; // cor padrão para outros casos
      }
    },

    getTypeByType(tipoOrdem) {
      switch (tipoOrdem) {
        case 'ORDEM_COMPRA':
          return 'Compra'; // substitua 'status1' pela condição real
        case 'ORDEM_VENDA':
          return 'Venda'; // substitua 'status2' pela condição real
        default:
          return 'null'; // cor padrão para outros casos
      }
    },
    getColorByType(tipoOrdem) {
      switch (tipoOrdem) {
        case 'ORDEM_VENDA':
          return 'dark'; // substitua 'status1' pela condição real
        case 'ORDEM_COMPRA':
          return 'info'; // substitua 'status2' pela condição real
        default:
          return 'null'; // cor padrão para outros casos
      }
    },
   
    async listarAllOrdens(){
      try{
            const listOderns = await service.getAllOrdersOpen()
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
            this.currentPage = 1;
              this.totalPages = Math.ceil(this.vetorOrderns.length / this.pageSize);               
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
    this.connection = new WebSocket(crudEnvioDados+"/chat");

    this.connection.onopen = (event) => { 
      console.log("WS conectado");
    };

    this.connection.onmessage = (event) => { 
      var jsonObj = JSON.parse(event.data); 
      console.log(jsonObj);
      if(jsonObj.tipo == "ordem"){
        if (Array.isArray(this.vetorOrderns)) {
      const index = this.vetorOrderns.findIndex(ordem => ordem.id === jsonObj.dados.id);
      console.log("this.vetorOrderns",index);
      console.log(this.vetorOrderns);
 

  
      if (index !== -1) {
          const updateOrdem = {
          id: jsonObj.dados.id,
          idAtivo: jsonObj.dados.id_ativo,
          dataLancamento: this.getDateTime(),
          sigla: this.getSigla(jsonObj.dados.id_ativo),
          idCliente: jsonObj.dados.id_cliente,
          quantidadeOrdem: jsonObj.dados.quantidade_ordem,
          statusOrdem: jsonObj.dados.status_ordem,
          tipoOrdem: jsonObj.dados.tipo_ordem,
          valorOrdem: jsonObj.dados.valor_orde
        };
      this.vetorOrderns[index] = updateOrdem
      this.vetorOrderns.splice(index, 1);
    } else {
        const novaOrdem = {
          id: jsonObj.dados.id,
          idAtivo: jsonObj.dados.id_ativo,
          dataLancamento: this.getDateTime(),
          sigla: this.getSigla(jsonObj.dados.id_ativo), 
          idCliente: jsonObj.dados.id_cliente,
          quantidadeOrdem: jsonObj.dados.quantidade_ordem,
          statusOrdem: jsonObj.dados.status_ordem,
          tipoOrdem: jsonObj.dados.tipo_ordem,
          valorOrdem: jsonObj.dados.valor_ordem
        };
        this.vetorOrderns.unshift(novaOrdem);
      }
      console.log("this.vetorOrderns");
      console.log(this.vetorOrderns);
      }
     
  }



      

    };

    this.connection.onerror = (event) => { // Usando arrow function
      console.error("Erro no WebSocket:", event);
    };

    this.connection.onclose = (event) => { // Usando arrow function
      console.log("Conexão WS fechada:", event);
    };
  },

  formatarData(item){
    const ano = item.substring(2, 4)
    const mes = item.substring(5, 7)
    const dia = item.substring(8, 10)
    const hora = item.substring(11, 13)
    const minuto = item.substring(14, 16)
    const formatado = `${dia}/${mes}/${ano} às ${hora}:${minuto}`
    return formatado
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
