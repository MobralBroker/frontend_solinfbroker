<template>
  <div>
    
  
    <CRow>
      <CCol :md="12">
      <CCard class="mb-4">


    <CCardHeader color="danger">Carteira</CCardHeader>
    <CCol :xs="12" class="mb-4">
      <CCard>
        <CCardBody>
           <CRow>
              <CCol :xs="6">
                <CCol :xs="10">
                  <CWidgetStatsF color="success" :padding="false" title="DEPOSITAR" :value="this.userProfile.saldo">
                    <template #icon><CIcon icon="cil-dollar" size="xl"/>  
                        <CFormInput type="text" id="text" name="text" placeholder="Valor"  v-model="valorDeposito"/> 
                    </template>
                  </CWidgetStatsF>
                  <br>
                  <CButton color="success" shape="rounded-pill" class="px-12" @click="deposito()" style="color: white;">DEPOSITO</CButton>
                </CCol>
                <br>
              </CCol>

              <CCol :xs="6">
                <CCol :xs="10">
                  <CWidgetStatsF color="danger" :padding="false" title="SACAR" :value="this.userProfile.saldo">
                    <template #icon><CIcon icon="cil-dollar" size="xl"/>  
                        <CFormInput type="text" id="text" name="text" placeholder="Valor" v-model="valorSaque" /> 
                    </template>
                  </CWidgetStatsF>
                  <br>
                  <CButton color="danger" shape="rounded-pill" class="px-12" @click="saque()" style="color: white;">SAQUE</CButton>
                </CCol>
                <br>
              </CCol>

            </CRow>
       
          </CCardBody>
      </CCard>
    </CCol>
         

                        
        </CCard>
      </CCol>
    </CRow>

  
  
  
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

          userProfile: {
          },
          valorSaque:0,
          valorDeposito:0,
    }
  },
  methods:{

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
        console.log(this.userProfile)
      } catch(error){
        console.log(error)
      }
  },

  async saque(){
    try{
      const response = await service.getSaque(this.userProfile.id,this.valorSaque);
      swal('Sucesso', 'Deposito efetuado!', 'success');
      } catch(error){
        swal('Erro', 'Ocorreu um erro ao efetuar o deposito T.T', 'error');
        console.log(error)
      }
  },

  async deposito(){
    try{
      const response = await service.getDeposito(this.userProfile.id,this.valorDeposito);
      swal('Sucesso', 'Saque realizado!', 'success');
      } catch(error){
        swal('Erro', 'Ocorreu um erro ao concluir o saque! T.T', 'error');
        console.log(error)
      }
    }

  },

  /*  FINISH FUNC'S    */

  mounted() {
    this.getProfile();
  },
}
</script>
