import Component from "./lib/common/Component.js";
import Header from "./lib/Components/Header/Header.js";
import Nav from "./lib/Components/Header/Nav.js";
import FrontPage from './lib/Pages/FrontPage.js'
import DashboardPage from './lib/Pages/DashboardPage.js'
import GoalPage from "./lib/Pages/GoalPage.js";

const FRONT_PAGE = 1;
const DASHBOARD_PAGE = 2;
const GOAL_PAGE = 3;
class App extends Component{
    constructor() {
        super();
        this.goals = [];
        this.currentGoal = -1;


        this.header = new Header(this);
        this.nav = new Nav(this);
        this.frontPage = new FrontPage(this);
        this.dashboardPage = new DashboardPage(this);
        this.goalPage = new GoalPage(this);
        this.pageState = FRONT_PAGE;
        this.authObject = null;
        this.currentChildPageNode = null;
        
        this.initNode();
    }
    
    get html() {
        return `<div class="App"></div>`;
    }
    get FRONT_PAGE() {return FRONT_PAGE;}
    get DASHBOARD_PAGE() {return DASHBOARD_PAGE;}
    get GOAL_PAGE() {return GOAL_PAGE;}

    init() {

        this.node.appendChild(this.header.node);
        this.node.appendChild(this.nav.node);
        this.node.appendChild(this.frontPage.node);
        this.currentChildPageNode = this.frontPage.node;
    }

    swapPage() {
        let newNode = null;
        switch(this.pageState) {
            case DASHBOARD_PAGE:
                newNode = this.dashboardPage.node;
                break;
            case GOAL_PAGE:
                newNode = this.goalPage.node;
                break;
            default:
                newNode = this.frontPage.node;
                break;
        }
        if(newNode != this.currentChildPageNode) {
            this.node.replaceChild(newNode, this.currentChildPageNode);
            this.currentChildPageNode = newNode;
        }
    }

    set page(page) {
        this.pageState = page;
        this.swapPage();
    }
    get page() {
        return this.pageState;
    }

    set auth(auth) {
        this.authObject = auth;
    }
    get auth() {
        return this.authObject;
    }
}
export default App;