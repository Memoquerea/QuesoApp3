import { LitElement, html } from 'lit-element';
import sandbox from '../sandbox/sandbox';

class QuesoCtrlBar extends LitElement {
	
	static get properties() {
		return {
			count:{type:Number}			
		};
	}
	
	constructor() {
		super();			
		this.count=0;
		sandbox.on('cheese-count',this.setCount.bind(this));
	}
	
  render() {
    return html`
		      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
                      <div class='float-right d-inline text-light mr-auto'>    
			Hay <span class="badge-light inline rounded"> ${this.count}</span> quesos
		      </div>	
	`;
  }

  setCount(e)
  {
	this.count=e.detail.count;
  }	    
}

customElements.define('queso-ctrlbar', QuesoCtrlBar)
