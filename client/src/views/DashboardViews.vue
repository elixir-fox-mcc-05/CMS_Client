<template>
  <div>
    
    <topNavbar></topNavbar>

    <div class="container-fluid">
        <div class="row">
            <sidebarMenu></sidebarMenu>
            <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
                <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 class="h2">Dashboard</h1>
                    <div class="btn-toolbar mb-2 mb-md-0">
                    <div class="btn-group mr-2">
                        <button type="button" class="btn btn-sm btn-outline-secondary">Share</button>
                        <button type="button" class="btn btn-sm btn-outline-secondary">Export</button>
                    </div>
                    <button type="button" class="btn btn-sm btn-outline-secondary dropdown-toggle">
                        <span data-feather="calendar"></span>
                        This week
                    </button>
                    </div>
                </div>
                <div class="content">
                    <h1 class="display1">
                        this feature is not aviable yet
                    </h1>
                </div>
            </main>
        </div>
    </div>

  </div>
</template>

<script>
// import LineChart from '../script/lineChart.vue'
import sidebarMenu from '../components/Navbar'
import topNavbar from '../components/topNavbar'
export default {
    name: 'dashboard',
    components: {
        sidebarMenu,
        topNavbar
    },
    data () {
        return {
            chartdata: {
                labels: [
                'Sunday',
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday'
                ],
                datasets: [{
                data: [
                    15339,
                    21345,
                    18483,
                    24003,
                    23489,
                    24092,
                    12034
                ],
                lineTension: 0,
                backgroundColor: 'transparent',
                borderColor: '#007bff',
                borderWidth: 4,
                pointBackgroundColor: '#007bff'
                }]
            },
            options: {
                scales: {
                yAxes: [{
                    ticks: {
                    beginAtZero: false
                    }
                }]
                },
                legend: {
                display: false
                }
            }
        }
    },
    methods: {
        
    },
    created() {
        if(!localStorage.getItem('token')) {
            this.$router.push('/')
        }
    }
}
</script>

<style scoped>
body {
  font-size: .875rem;
}

.feather {
  width: 16px;
  height: 16px;
  vertical-align: text-bottom;
}


</style>