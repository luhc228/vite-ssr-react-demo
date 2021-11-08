import { Link, Route, Switch } from 'react-router-dom'
import { axios } from '@ice/runtime';
import { useEffect } from 'react';

// Auto generates routes from files under ./pages
// https://vitejs.dev/guide/features.html#glob-import
const pages = import.meta.globEager('./pages/*.jsx')

const routes = Object.keys(pages).map((path) => {
  const name = path.match(/\.\/pages\/(.*)\.jsx$/)[1]
  return {
    name,
    path: name === 'Home' ? '/' : `/${name.toLowerCase()}`,
    component: pages[path].default
  }
})

export function App() {
  useEffect(() => {
    axios.get('https://www.baidu.com').then(res => {
      console.log(res)
    })
  }, []);
  return (
    <>
      <nav>
        <ul>
          {routes.map(({ name, path }) => {
            return (
              <li key={path}>
                <Link to={path}>{name}</Link>
              </li>
            )
          })}
        </ul>
      </nav>
      <Switch>
        {routes.map(({ path, component: RouteComp }) => {
          return (
            <Route key={path} path={path}>
              <RouteComp />
            </Route>
          )
        })}
      </Switch>
    </>
  )
}
