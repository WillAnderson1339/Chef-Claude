import '../css/Main.css'

function Main() {
  return (
    <main>
        <form className="add-ingredient-form">
            <input 
            type="text" 
            placeholder="e.g. oregano"
            aria-label="Add ingredient"
            />
            <button type="submit">Add Ingredient</button>
        </form>
    </main>
  )
}

export default Main
