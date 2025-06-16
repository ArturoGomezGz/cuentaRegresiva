import './App.css'
import Countdown from './components/Countdown'
import { createMexicoDate } from './utils/timezone'

function App() {
	// Opción 1: Crear fecha específicamente en zona horaria de México
	const targetDate = createMexicoDate('2025-06-30', '19:00:00')
	
	// Opción 2: Usar fecha directa (se interpretará en zona horaria local y se convertirá a México)
	// const targetDate = new Date('2025-06-30T18:30:00')
	
	const handleCountdownComplete = () => {
		console.log('¡Countdown completed!')
		alert('¡La cuenta regresiva ha terminado! 🎉')
	}

	return (
		<div className="container-fluid bg-light min-vh-100">
			<div className="row justify-content-center">
				<div className="col-12 col-xl-10">
					<div className="py-5">
						<div className="text-center mb-5">
							<h1 className="display-3 fw-bold text-primary mb-3">
								❤️ Cuenta Regresiva
							</h1>
						</div>
						<Countdown 
							targetDate={targetDate}
							title="Tiempo para volverte a ver"
							onComplete={handleCountdownComplete}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default App
