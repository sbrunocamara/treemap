const data = {
    "values": [
        {
            "values": [
                {"name": "Lavadoras", "value": 100},
                {"name": "Geladeiras", "value": -300},
                {"name": "Fogões", "value": 150},
                {"name": "Máquinas de lava louça", "value": -250},
                {"name": "Airfryers", "value": 100},
                {"name": "Fornos", "value": -100},
                {"name": "Microondas", "value": 250}
            ]
        },
        {
            "values": [
                {"name": "Televisões", "value": 200},
                {"name": "Aparelhos de som", "value": -400},
                {"name": "Freezers", "value": 250}
            ]
        },
        {
            "values": [
                {"name": "Ar condicionados", "value": 300},
                {"name": "Rádios", "value": 450},
                {"name": "Computadores", "value": 100},
                {"name": "Celulares", "value": 150}
            ]
        }
    ]
};


class Treemap {
    constructor(data, width, height, elementId) {
        this.data = data;
        this.width = width;
        this.height = height;
        this.element = document.getElementById(elementId);
    }

    calcularLayout(data, x, y, width, height) {

        // Calcula o tamanho total do gráfico
        const totalValue = data.values.reduce((acc, conjunto) => acc + conjunto.values.reduce((sum, sub) => sum + Math.abs(sub.value), 0), 0);

        const result = [];
        let currentY = y;

        // Calcula os tamanhos dos conjuntos dentro do gráfico
        data.values.forEach((conjunto, index) => {
            const conjuntoTotal = conjunto.values.reduce((sum, sub) => sum + Math.abs(sub.value), 0);
            const conjuntoHeight = (conjuntoTotal / totalValue) * height;
            let currentX = x;

            conjunto.values.forEach((sub) => {
                const subWidth = (Math.abs(sub.value) / conjuntoTotal) * width;
                result.push({
                    x: currentX,
                    y: currentY,
                    width: subWidth,
                    height: conjuntoHeight,
                    name: sub.name,
                    value: sub.value,
                    color: sub.value >= 0 ? '#21BF73' : '#FD5E53' // Verde se for positivo, vermelho se for negativo
                });
                currentX += subWidth;
            });

            currentY += conjuntoHeight;
        });

        return result;
    }

    render() {
        const nodes = this.calcularLayout(this.data, 0, 0, this.width, this.height);

        // Printa na tela 
        nodes.forEach(node => {
            const div = document.createElement('div');
            div.className = 'node';
            div.style.left = node.x + 'px';
            div.style.top = node.y + 'px';
            div.style.width = node.width + 'px';
            div.style.height = node.height + 'px';
            div.style.backgroundColor = node.color;
            div.innerText = `${node.name}: ${node.value}`;
            this.element.appendChild(div);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const treemap = new Treemap(data, 960, 600, 'treemap');
    treemap.render();
});

