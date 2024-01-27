<template>

  <div>

  
    <CRow>
      <CCol :md="12">
      <CCard class="mb-4">

    <CCardHeader>Compra & Venda de Ativos</CCardHeader>
    <CCol :xs="12" class="mb-4">
      <CCard>
        <CCardBody>
          <CCardBody>
            <CRow>
              <CCol :xs="6">

                <!-- Compra/Venda -->
                <CListGroup>
                  <CListGroupItem active>Ordem</CListGroupItem>
                  <!--<CFormInput placeholder="Ativo" autocomplete="Ativo" v-model="selectedAtivo.sigla"> </CFormInput>-->
                  <input placeholder="Ativo" autocomplete="Ativo" v-model="selectedAtivo.sigla">
                  <!--<CFormInput placeholder="Valor" autocomplete="Valor" v-model="selectedAtivo.valor"/>-->
                  <input placeholder = "Valor" type="text" id="text" v-model="selectedAtivo.valor" v-maska:[maska_options] data-maska="0.99" data-maska-tokens="0:\d:multiple|9:\d:optional">
                  <!--<CFormInput placeholder="Quantidade" autocomplete="username" v-model="orderSellandBuy.quantidadeOrdem" />-->
                  <input placeholder="Quantidade" autocomplete="username" v-model="orderSellandBuy.quantidadeOrdem">
                  <CFormSwitch v-model="switchValue" :switch="{ color: 'success' }" size="xl" label="Vender" id="formSwitchCheckDefaultXL"/>
                </CListGroup>
                <br>
                <CButton color="success" shape="rounded-pill" class="px-8" @click="check_possibleBuy(selectedAtivo.valor)" style="color: white;">Enviar Ordem</CButton>

              </CCol>


              <CCol :xs="6">
                <CCol :xs="10">
                  <CWidgetStatsF color="info" :padding="false" :title="userProfile.email" :value="userProfile.nomeUsuario" >
                    <template #icon><CIcon icon="cil-people" size="xl"/> </template>
                  </CWidgetStatsF>

                </CCol>
                <br>
                <CCol :xs="10">
                  <CWidgetStatsF color="warning" :padding="false" title="SALDO" :value="'R$ ' + userProfile.saldo"> <!-- userProfile.saldo -->
                      <template #icon><CIcon icon="cil-dollar" size="xl"/> </template>
                  </CWidgetStatsF>
                </CCol>
              </CCol>


            </CRow>
          </CCardBody>
        </CCardBody>
      </CCard>
    </CCol>
         

                        
        </CCard>
      </CCol>
    </CRow>



    <CRow>
      
      <CCol :md="12">
        
        <CCard class="mb-4">
          <CCardHeader>Destaques de Mercado</CCardHeader>

            <CTable align="middle" class="mb-0 border" hover responsive>
              <CTableHead class="text-nowrap">
                <CTableRow>
                  <CTableHeaderCell class="bg-body-secondary text-center" > Ativo </CTableHeaderCell>
                  <CTableHeaderCell class="bg-body-secondary text-center"> Atualização </CTableHeaderCell>
                  <CTableHeaderCell class="bg-body-secondary text-center"> Max. </CTableHeaderCell>
                  <CTableHeaderCell class="bg-body-secondary text-center"> Min.</CTableHeaderCell>
                  <CTableHeaderCell class="bg-body-secondary text-center"> Valor </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow v-for="item in vetorAtivos" :key="item.id" v-on:click="(handleItemAtivo(item))" >
                <CTableDataCell class="text-center"> <div>{{ item.sigla }} </div> </CTableDataCell>
                <CTableDataCell class="text-center"> <div> {{ item.atualizacao }} </div> </CTableDataCell>
                <CTableDataCell class="text-center"> <div class="fw-semibold">R$ {{ item.valorMax }}</div> </CTableDataCell>
                <CTableDataCell class="text-center"> <div class="fw-semibold">R$ {{ item.valorMin }}</div> </CTableDataCell> 
                <CTableDataCell> <div class="fw-semibold text-nowrap text-center ">R$ {{ item.valor }} </div> </CTableDataCell>
              </CTableRow>
            </CTableBody>
            </CTable>

        </CCard>
      </CCol>
    </CRow>
    

    <CRow>
    <CCol :md="12">
    
    


    
    </CCol>
   </CRow>
  
  
  </div>
</template>
<script setup> import { vMaska } from "maska";</script>


<script>
import service from '../../service/controller';
import swal from 'sweetalert';

//Valores para v-mask
export const maska_options = {
  preProcess: val => val.includes('R$')
    ? val
      .replace(/[.]/g, ' ')
      .replace(/[,]/g, '.')
      .replace(/[^.0-9]/g, '')
    : val
      .replace(/[^.0-9]/g, ''),
  postProcess: val => {
    if (!val) return ''

    const sub = 3 - (val.includes('.') ? val.length - val.indexOf('.') : 0)

    return Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })
      .format(val)
      .slice(0, sub ? -sub : undefined)
  }
}

export default {
  name: 'Dashboard',
  components: {
  },
  data() {
    
    return {
          connection: null ,
          orderSellandBuy: {
                    idCliente:'',
                    idAtivo: '', 
                    tipoOrdem: '',
                    valorOrdem: '',
                    quantidadeOrdem: null
          },
          selectedAtivo: {
              id: null,
              sigla: '',
              nome: null,
              atualizacao: null,
              quantidadesPapeis: null,
              valorMax: null,
              valorMin:null,
              valor: null
          },

          vetorAtivos: [],
          
          userProfile: {
          },
          switchValue: false,
    }
  },
  methods:{
  

    handleItemAtivo(item){
      this.selectedAtivo.id = item.id
      this.selectedAtivo.sigla = item.sigla
      this.selectedAtivo.nome = item.nome
      this.selectedAtivo.atualizacao = item.atualizacao
      this.selectedAtivo.quantidadesPapeis = item.quantidadesPapeis
      this.selectedAtivo.valorMax = item.valorMax
      this.selectedAtivo.valorMin = item.valorMin
      this.selectedAtivo.valor = item.valor
    },

    async Order(value){
                  console.log(this.switchValue)
              
                  if(this.switchValue == true){
                    this.orderSellandBuy.tipoOrdem = "ORDEM_VENDA"
                  }else{
                    this.orderSellandBuy.tipoOrdem = "ORDEM_COMPRA"
                  }
                  
                   this.orderSellandBuy.quantidadeOrdem = parseInt( this.orderSellandBuy.quantidadeOrdem , 10)
                   this.orderSellandBuy.idCliente = this.userProfile.id
                   this.orderSellandBuy.idAtivo = this.selectedAtivo.id
                   this.orderSellandBuy.valorOrdem = value

                try {
                    await service.sentOrder(this.orderSellandBuy);
                    swal('Sucesso', 'Ordem submetidas com sucesso!', 'success');
                    } catch (error) {
                        console.error('Erro ao comprar ações:', error);
                        swal('Erro', 'Ocorreu um erro ao processar sua ordem T.T', 'error');
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
                console.log(this.vetorAtivos)
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
        localStorage.setItem('idCliente', this.userProfile.id);
      } catch(error){
        console.log(error)
      }
    },

    check_possibleBuy(value){
      console.log(value)
      value = value.replace("R", "")
      value = value.replace("$", "")
      do{
        value = value.replace(".", "")
      }while(value.includes("."))
      value = value.replace(",", ".")
      value = value.trim()
      console.log(value)
      if(this.switchValue == true){
        this.Order(value)
        return 'Ordem de venda, ignorar'
      }else if(this.switchValue == false){
        if(value > this.userProfile.saldo){
          swal('Aviso', 'A compra que você está tentando fazer excede o seu saldo.', 'warning')
          return 'Saldo baixo, impossível fazer compra'
        }else if(value <= this.userProfile.saldo){
          this.Order(value)
          return 'Sucesso, saldo alto o bastante'
      }
      }
    },

  sendMessage(message) {
    console.log(this.connection);
    this.connection.send(message);
  }

  },

  
  /*  FINISH FUNC'S    */

  created: function () {
      console.log("starting conexao")
      this.connection = new WebSocket("ws://localhost:8086/chat")

      this.connection.onopen = function (event){
        console.log(event)
        console.log("conectado")
      }

      this.connection.onmessage = function(event){
        console.log(event)
      }

  },

  mounted() {
    this.Ativos();
    this.getProfile();
  },
}
</script>
