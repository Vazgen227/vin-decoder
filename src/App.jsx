import './App.css'
import HomePage from './pages/HomePage'
import VariableDetailPage from'./pages/VariableDetailPage'
import VariablePage from'./pages/VariablesPage'
import Header from './Header'
import { Route, Routes } from 'react-router-dom'
function App() {
 return (
   <>
   <Header />
    <Routes>
    <Route path='/' element={<HomePage/>}/>
    <Route path="/variables" element={<VariablePage/>}/>
    <Route path="/variables/:id" element={<VariableDetailPage/>}/>
    </Routes>
    </>
 )
}

export default App