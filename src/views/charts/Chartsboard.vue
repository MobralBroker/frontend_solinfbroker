<template>
    <div>

        <CCol :md="12">
            <CCard class="mb-4">
                <CCardBody>
                    <Line :data="data" :options="options" />
                </CCardBody>
            </CCard>
        </CCol>

        <CCol :md="12">
            <CCard class="mb-4">
                <CCardHeader>
                    Chart de Vela
                </CCardHeader>
                <CCardBody>
                    Teste
                </CCardBody>
            </CCard>
        </CCol>

    </div>
</template>

<script>
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'
import * as chartConfig from '@/service/chartdata.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

export default {
    name: 'App',
    components: {
        Line
    },
    data() {
        return chartConfig
    }
}
</script>