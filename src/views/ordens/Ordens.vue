<template>
  <div>
    
  
      
      <CCol :md="12">
        
        <CCard class="mb-4">
          <CCardHeader>Ordens</CCardHeader>

            <CTable align="middle" class="mb-0 border" hover responsive>
              <CTableHead class="text-nowrap">
                <CTableRow>
                  <CTableHeaderCell class="bg-body-secondary text-center" > ID </CTableHeaderCell>
                  <CTableHeaderCell class="bg-body-secondary text-center"> Ativo </CTableHeaderCell>
                  <CTableHeaderCell class="bg-body-secondary text-center"> Quantidade </CTableHeaderCell>
                  <CTableHeaderCell class="bg-body-secondary text-center"> Tipo</CTableHeaderCell>
                  <CTableHeaderCell class="bg-body-secondary text-center"> Valor </CTableHeaderCell>
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
                <CTableDataCell> <div class="fw-semibold text-nowrap text-center "> <CBadge :color="getColorByStatus(item.statusOrdem)"> {{ item.statusOrdem }} </CBadge> </div> </CTableDataCell>                
                <CTableDataCell> <CButton color="danger" shape="rounded-pill" class="px-12" @click="deteleOrder(item.id)" style="color: white;"> Cancelar ordem</CButton> </CTableDataCell>

              </CTableRow>
              </CTableBody>
              
              <br>
              <div class="text-center">              
                <CButton color="success"  class="px-8 text-center" @click="listarOrdens()" style="color: white;">Atualizar</CButton>
              </div>
              <br>
            </CTable>
        </CCard>
      </CCol>
  </div>
</template>

<script>

import service from '../../service/controller';
import swal from 'sweetalert';

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
   
    async listarOrdens(id){
      try{
            const listOderns = await service.getOrdensClient(id)
            console.log(listOderns)
            if (Array.isArray(listOderns)) {

              this.vetorOrderns = listOderns.map(ordem => {   
                return {
                    id: ordem.id,
                    idAtivo: ordem.idAtivo,
                    sigla: ordem.sigla,
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

  async deteleOrder(idAtivo){
    try{

      this.objCancelaOrderm.idAtivo = idAtivo
      this.objCancelaOrderm.tipoOrdem = null
      this.objCancelaOrderm.valorOrdem = null
      this.objCancelaOrderm.quantidadeOrdem = null
      
      await service.deleteOrdemClient(idAtivo, this.objCancelaOrderm);
      
      swal({
            title: 'Sucesso!',
            text: 'Ordem deletada!',
            icon: 'success',
          }).then(()=>{
              const idClient = localStorage.getItem('idCliente')
              this.listarOrdens(idClient);
          });
      } catch(error){
        swal('Erro', 'Ocorreu um erro ao deletar a ordem T.T', 'error');
        console.log(error)
      }
  },

  },

  /*  FINISH FUNC'S    */





  mounted() {
    const idClient = localStorage.getItem('idCliente')

    this.getProfile();
    this.listarOrdens(idClient);

  },
  

}
</script>
