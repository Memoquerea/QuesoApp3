import { LitElement, html, css } from 'lit-element';  
import './queso-list.js';
import './queso-ficha.js';

class QuesoMain extends LitElement {   

	static get styles()
	{
		return css `
			div
			{
			   margin-top:100px;	
			}
		`;
	}

	constructor()
	{
		super();
	}

	render() {
		return html`
			<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
			<div class='container'>
				<queso-list src="http://localhost:3000/cheeses"></queso-list>
				<queso-ficha class="d-none"></queso-ficha>
			</div>
		`;
	}

}  

customElements.define('queso-main', QuesoMain); 
