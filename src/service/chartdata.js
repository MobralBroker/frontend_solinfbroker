export const data = {
    labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    datasets: []
};

// Gera 5 conjuntos de dados com valores aleatórios e cores diferentes
for (let i = 1; i <= 5; i++) {
    const randomColor = getRandomColor();
    const dataset = {
        label: `Data ${i}`,
        backgroundColor: randomColor,
        data: generateRandomValues()
    };
    data.datasets.push(dataset);
}

// Função para gerar valores aleatórios
function generateRandomValues() {
    const values = [];
    for (let i = 0; i < 12; i++) {
        values.push(Math.floor(Math.random() * 100)); // Gera valores entre 0 e 100
    }
    return values;
}

// Função para gerar uma cor aleatória em formato hexadecimal
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


export const options = {
    responsive: true,
    maintainAspectRatio: true
}