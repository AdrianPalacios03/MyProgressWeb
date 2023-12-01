export const getRandomQuote = () => {
    const quotes = [
        'No quiero ser una decepción para mi mismo',
        '"Somos lo que hacemos repetidamente. La excelencia, entonces, no es un acto, sino un hábito."',
        '“La mejor forma de predecir el fututo es inventarlo.”',
        '"No vemos las cosas como son, sino como somos nosotros."',
        '"Planes a corto, medio y largo plazo."',
        '"Recuerda que no puedes cambiar el pasado, pero puedes ensayar el futuro."',
        '"Somos lo que nos ponemos en la cabeza"',
        '"El precio de la procrastinación es la vida que pudiste haber vivido"',
        '"Recuerda por lo que luchas y no te rindas"',
    ]
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
    return randomQuote
}