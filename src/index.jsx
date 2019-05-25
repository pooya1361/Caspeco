import React from "react";
import ReactDOM from "react-dom";
import { Col, Row, Button, FormControl, Form } from 'react-bootstrap';


class Index extends React.Component {

    constructor() {
        super()
        this.state = {
            textValue: '',
            articles: [],
            bins: [],
            binCount: 3,
            accuracy: 0
        }
    }

    addArticle() {
        this.state.articles.push(parseInt(this.state.textValue))
        this.setState({
            textValue: '',
        })
        this.nameInput.focus();
    }

    updateText(e) {
        this.setState({ textValue: e.target.value })
    }

    Pack(_art) {
        const art = !!_arc ? _arc : [...this.state.articles].sort((a, b) => b - a)

        this.setState({ bins: [] })
        const bins = []
        for (let i = 0; i < this.state.binCount; i++) {
            bins.push([])
        }
        art.forEach(x => {
            const lightestBinIndex = this.getLightestBin(bins)
            bins[lightestBinIndex].push(x)
        })

        this.setState({
            bins: [...bins]
        })

        return [...bins]

        this.forceUpdate();
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

    handleFormChange(e) {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    render() {
        const articleStyle = {
            padding: "3px",
            marginRight: "4px",
            marginBottom: "4px",
            backgroundColor: "#edf3fc",
            minWidth: "30px",
            justifyContent: "center",
            border: "1px solid #dee2e6"
        }

        const articles = this.state.articles.map((x, index) =>
            <span className="d-inline-flex" key={index} style={articleStyle}>{x}</span>
        )

        const packs = this.state.bins.map((x, i) =>
            <div key={i} className="w-25 d-inline-flex flex-column mb-4 p-2 justify-content-between m-2 shadow-sm" style={{
                backgroundColor: "whitesmoke", border: "1px solid #dee2e6"
            }}>
                <div className="mb-1">
                    {x.map((y, i) =>
                        <span className="d-inline-flex" key={i} style={articleStyle}>{y}</span>
                    )}
                </div>
                <span className="text-center"><b>Vikt: </b>{x.reduce((a, b) => a + b, 0)}</span>
            </div>
        )

        const avg = () => {
            if (this.state.articles.length > 0) {
                return <span>Avg: {Math.round(this.state.articles.reduce((a, b) => a + b, 0) / this.state.binCount)}</span>

            }
        }
        return (
            <div className="container-fluid main_container d-flex">
                <div className="row flex-fill pt-3 pb-3">
                    <Col md={3}>
                        <Row className="mb-3">
                            <Col md={12}>
                                <Form>
                                    <Form.Label>Antal Box:</Form.Label>
                                    <Form.Control type="number" value={this.state.binCount} name="binCount" onChange={this.handleFormChange.bind(this)} />
                                </Form>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col md={12}>
                                <Button className="w-100" variant="primary" onClick={this.addRandom.bind(this)}>Lägg till 10 random artiklar</Button>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col md={7}>
                                <FormControl
                                    ref={(input) => { this.nameInput = input; }}
                                    id="standard-name"
                                    value={this.state.textValue}
                                    onChange={this.updateText.bind(this)}
                                    margin="normal"
                                />
                            </Col>
                            <Col md={5}>
                                <Button className="w-100" variant="primary" onClick={this.addArticle.bind(this)}>Lägg till</Button>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col md={6}>
                                Antal: {this.state.articles.length}
                            </Col>
                            <Col md={6}>
                                Totalvikt: {this.state.articles.reduce((a, b) => a + b, 0)}
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col md={12}>
                                <Button className="w-100" variant="danger" onClick={this.clearArticles.bind(this)}>Rensa artiklar</Button>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col md={6}>
                                <Button variant="success" onClick={this.Pack.bind(this)}>Dela ut</Button>
                            </Col>
                            <Col md={6} className="align-items-center d-flex">
                                {avg()}
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col md={12}>
                                {articles}
                            </Col>
                        </Row>
                    </Col>
                    <Col md={9}>
                        {packs}
                    </Col>
                </div>
            </div>
        );
    }
};

ReactDOM.render(<Index />, document.getElementById("app"));
