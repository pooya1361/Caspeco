
export let Pack = (articles, numBoxes) => {
    const art = articles.sort((a, b) => b - a)

    const bins = []
    for (let i = 0; i < numBoxes; i++) {
        bins.push([])
    }
    art.forEach(x => {
        const lightestBinIndex = getLightestBin(bins)
        bins[lightestBinIndex].push(x)
    })

    return bins
}

function getLightestBin(bins) {
    let lightestBinIndex = 0
    let lightestBinWeight = bins[0].reduce((a, b) => a + b, 0)
    bins.forEach((x, i) => {
        const tmp = x.reduce((a, b) => a + b, 0)
        if (tmp < lightestBinWeight) {
            lightestBinWeight = tmp
            lightestBinIndex = i
        }
    })

    return lightestBinIndex
}
