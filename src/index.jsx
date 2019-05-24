import React from "react";
import ReactDOM from "react-dom";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { string } from "prop-types";

class Index extends React.Component {

    constructor() {
        super()
        this.state = {
            textValue: '',
            articles: [6, 8, 9, 15, 22, 4, 20, 33, 19, 8, 1, 11, 24],
            count: 3
        }
    }

    addArticle() {
        this.state.articles.push(parseInt(this.state.textValue))
        this.setState({ textValue: '' })
    }

    updateText(e) {
        this.setState({ textValue: e.target.value })
    }

    distribute() {
        const art = [...this.state.articles].sort((a, b) => b - a)

        const bins = []
        for (let i = 0; i < this.state.count; i++) {
            bins.push([])
        }
        art.forEach(x => {
            const lightestBinIndex = this.getLightestBin(bins)
            bins[lightestBinIndex].push(x)
        })

        console.clear()
        bins.forEach(x => {
            console.log(x, x.reduce((a, b) => a + b, 0))
        })
    }

    getLightestBin(bins) {
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

    render() {
        const articles = this.state.articles.map((x, index) =>
            <span key={index} style={{ padding: "3px", marginRight: "4px", backgroundColor: "#edf3fc" }}>{x}</span>
        )

        return (
            <div>
                <TextField
                    id="standard-name"
                    value={this.state.textValue}
                    onChange={this.updateText.bind(this)}
                    margin="normal"
                /><Button variant="contained" color="primary" onClick={this.addArticle.bind(this)}>Lägg till</Button>

                <div>
                    {articles}
                </div>

                <Button variant="contained" color="primary" onClick={this.distribute.bind(this)}>Dela ut</Button>
            </div>
        );
    }
};

ReactDOM.render(<Index />, document.getElementById("app"));
