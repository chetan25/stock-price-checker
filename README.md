This is a simple Stock Info finder app. User can search the price and basic info of the stock by just typing the stock symbol. The App uses the api from <a href="https://iexcloud.io">iexcloud</a> to search the stock information.
## Getting Started

<h4>Pre Requisite API keys </h4> 
You need to register for a free account with <a href="https://iexcloud.io">iexcloud</a> and get your api tokens. There are two tokens that you would require - 
<ul>
  <li>Api token for Production</li>
  <li>Api token for Sandbox</li>
</ul>
Once you have the api token, you need to create the <strong>'.env'</strong> in the root of the project and copy the content of the <strong>'.env-example'</strong> file and substitute the value with your token.

<h4>Install Dependencies</h4>

```bash
npm install
```

<h4>First, local run</h4>

```bash
npm run dev
```
This will start a local server at port 3000.
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

<h4>Run Test </h4>

```bash
npm run test
```

<h4>Production Build</h4>

```bash
npm run build
```

Static Export

```bash
npm run build
npm run export
```
This will create a 'out' folder in the root directory which could be hosted on any server.

## Tech Stack
<ul>
  <li>React - Frontend Framework.</li>
  <li>Ant Design - UI/UX components.</li>
  <li>Jest - Testing.</li>
  <li>Typescript - For static typing and type checks.</li>
  <li>Axios - For ajax requests.</li>
</ul>

