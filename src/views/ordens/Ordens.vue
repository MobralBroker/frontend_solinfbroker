<template>
  <div>
    <CCol :md="12">
        <CCard class="mb-4">
          <CCardHeader>Minhas Ordens</CCardHeader>
        </CCard>
    </CCol>



      <CCol :md="12">
        
        <CCard class="mb-4">
          <CCardHeader>Minhas Ordens</CCardHeader>

            <CTable align="middle" class="mb-0 border" hover responsive>
              <CTableHead class="text-nowrap">
                <CTableRow>
                  <CTableHeaderCell class="bg-body-secondary text-center" > ID </CTableHeaderCell>
                  <CTableHeaderCell class="bg-body-secondary text-center"> Ativo </CTableHeaderCell>
                  <CTableHeaderCell class="bg-body-secondary text-center"> Quantidade </CTableHeaderCell>
                  <CTableHeaderCell class="bg-body-secondary text-center"> Tipo</CTableHeaderCell>
                  <CTableHeaderCell class="bg-body-secondary text-center"> Valor </CTableHeaderCell>
                  <CTableHeaderCell class="bg-body-secondary text-center"> Data</CTableHeaderCell>
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
                <CTableDataCell> <div class="fw-semibold text-nowrap text-center ">{{ formatarValores(item.valorOrdem) }} </div> </CTableDataCell>
                <CTableDataCell> <div class="fw-semibold text-nowrap text-center "> {{ formatarData(item.dataLancamento) }} </div> </CTableDataCell>
                <CTableDataCell> <div class="fw-semibold text-nowrap text-center "> <CBadge :color="getColorByStatus(item.statusOrdem)"> {{ item.statusOrdem }} </CBadge> </div> </CTableDataCell>                
                <CTableDataCell> <CButton color="danger" shape="rounded-pill" class="px-12" @click="deteleOrder(item.id)" style="color: white;"> Cancelar ordem</CButton> </CTableDataCell>

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
import swal from 'sweetalert';
import { CPagination, CPaginationItem } from "@coreui/vue";

export default {
  name: 'Ordens',
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
      var listaPaginasTotal = [];
      var listaPaginas = []
      console.log(this.totalPages)
      for (let i = 1; i <= this.totalPages; i++) {
          listaPaginasTotal.push(i);  
      }
      if (this.totalPages > 8) {
        if (this.currentPage > 3 && this.currentPage < this.totalPages - 3) {
          listaPaginas = listaPaginasTotal.slice(this.currentPage - 4, this.currentPage + 4);
        } else if (this.currentPage <= 3) {
          listaPaginas = listaPaginasTotal.slice(0, 8);
        } else {
          listaPaginas = listaPaginasTotal.slice(-8);
        }
      } else {
        listaPaginas = listaPaginasTotal;
      }

      // console.log(paginasVisivel)

      return listaPaginas;
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
      }s
    },

    getTypeByType(tipoOrdem) {
      switch (tipoOrdem) {
        case 'ORDEM_VENDA':
          return 'Venda'; // substitua 'status1' pela condição real
        case 'ORDEM_COMPRA':
          return 'Compra'; // substitua 'status2' pela condição real
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
   
    async listarOrdens(){
      try{
            const listOderns = await service.getOrdensClient()
            console.log(listOderns)
            if (Array.isArray(listOderns)) {

              this.vetorOrderns = listOderns.map(ordem => {   
                return {
                    id: ordem.id,
                    idAtivo: ordem.idAtivo,
                    dataLancamento: ordem.dataLancamento,
                    sigla: ordem.sigla,
                    idCliente: ordem.idCliente,
                    quantidadeOrdem: ordem.quantidadeOrdem,
                    statusOrdem: ordem.statusOrdem,
                    tipoOrdem: ordem.tipoOrdem,
                    valorOrdem: ordem.valorOrdem
                };
              });
              console.log(this.vetorOrderns)

            this.currentPage = 1;
              this.totalPages = Math.ceil(this.vetorOrderns.length / this.pageSize);       
            }            
          } catch(error){
            console.log(error)
          }
    },

    async getProfile(){
      const email = localStorage.getItem('userMail')
      const response = await service.getUserProfile();
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

  async deteleOrder(idAtivo){
    try{

      this.objCancelaOrderm.idAtivo = idAtivo
      this.objCancelaOrderm.tipoOrdem = null
      this.objCancelaOrderm.valorOrdem = null
      this.objCancelaOrderm.quantidadeOrdem = null
      
      await service.deleteOrdemClient(idAtivo, this.objCancelaOrderm);
      
      swal({
            title: 'Sucesso!',
            text: 'Ordem Cancelada!',
            icon: 'success',
          }).then(()=>{
              
              this.listarOrdens();
          });
      } catch(error){
        swal('Erro', 'Ocorreu um erro ao deletar a ordem T.T', 'error');
        console.log(error)
      }
  },
  formatarValores(item) {

      // Formatando o valor como moeda brasileira
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(item );
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
    this.listarOrdens();

  },
  

}
</script>
