<template>
  <div>
      <CCol :md="12">
        
        <CCard class="mb-4">
          <CCardHeader>Minhas Açoes</CCardHeader>

            <CTable align="middle" class="mb-0 border" hover responsive>
              <CTableHead class="text-nowrap">
                <CTableRow>
                  <CTableHeaderCell class="bg-body-secondary text-center"> Ativo </CTableHeaderCell>
                  <CTableHeaderCell class="bg-body-secondary text-center"> Quantidade </CTableHeaderCell>
                  <CTableHeaderCell class="bg-body-secondary text-center"> Data de Compra</CTableHeaderCell>

                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow v-for="item in vetorAcoes" :key="item.id"  >
                <CTableDataCell class="text-center"> <div class="fw-semibold">{{ item.ativo }} </div> </CTableDataCell>
                <CTableDataCell class="text-center"> <div class="fw-semibold">{{ item.quantidadeOrdem }}</div> </CTableDataCell>
                <CTableDataCell class="text-center"> <div class="fw-semibold">{{ item.dataCompra }}</div> </CTableDataCell>
           
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
  name: 'Acoes',
  components: {
    
  },
  data() {
    
    return {
          vetorAcoes: [],
          
          userProfile: {
          },
    }
  },
  methods:{
   
    async listarAcoes(){
      try{
            const listAcoes = await service.getAcoesClient()
            console.log(listAcoes)
            if (Array.isArray(listAcoes)) {

              this.vetorAcoes = listAcoes.map(acao => {   
                return {
                    ativo: acao.ativo.sigla,
                    quantidadeOrdem: acao.quantidade,
                    dataCompra: acao.dataCompra,
                };
              });
              console.log(this.vetorAcoes)
            }            
          } catch(error){
            console.log(error)
          }
    },

    async getProfile(){
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
      
  }
},

  /*  FINISH FUNC'S    */

  mounted() {
    this.getProfile();
    this.listarAcoes();

  },
  

}
</script>
