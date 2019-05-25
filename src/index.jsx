import React from "react";
import ReactDOM from "react-dom";
import TextField from '@material-ui/core/TextField';
import { Col, Row, Button, FormControl } from 'react-bootstrap';


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

    addRandom() {
        for (let i = 0; i < 10; i++) {
            this.state.articles.push(Math.round(1 + Math.random() * 1000))
        }
        this.forceUpdate();
    }

    clearArticles() {
        this.state.articles = []
        this.forceUpdate();
    }

    render() {
        const articles = this.state.articles.map((x, index) =>
            <span className="d-inline-flex" key={index} style={{
                padding: "3px",
                marginRight: "4px",
                marginBottom: "4px",
                backgroundColor: "#edf3fc",
                minWidth: "30px",
                justifyContent: "center"
            }}>{x}</span>
        )

        return (
            <div className="container-fluid main_container d-flex">
                <div className="row flex-fill pt-3 pb-3">
                    <Col sx={3}>
                        <Row className="mb-3">
                            <Col sx={12}>
                                <Button className="w-100" variant="primary" onClick={this.addRandom.bind(this)}>Lägg till 10 random artiklar</Button>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col sx={7}>
                                <FormControl
                                    id="standard-name"
                                    value={this.state.textValue}
                                    onChange={this.updateText.bind(this)}
                                    margin="normal"
                                />
                            </Col>
                            <Col sx={5}>
                                <Button className="w-100" variant="primary" onClick={this.addArticle.bind(this)}>Lägg till</Button>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col sx={12}>
                                {articles}
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col sx={12}>
                                <Button className="w-100" variant="danger" onClick={this.clearArticles.bind(this)}>Rensa artiklar</Button>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col sx={12}>
                                <Button variant="success" onClick={this.distribute.bind(this)}>Dela ut</Button>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={9}>

                    </Col>
                </div>
            </div>
        );
    }
};

ReactDOM.render(<Index />, document.getElementById("app"));
