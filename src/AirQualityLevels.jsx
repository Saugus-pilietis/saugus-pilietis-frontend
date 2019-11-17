import React from 'react';
import Table from 'react-bootstrap/Table'

function AirQualityLevels() {

    return (
      <div className="h-100 w-100">
        <Table striped bordered>
            <thead>
                <tr>
                    <td>Oro taršos indeksas</td>
                    <td>Reikšmė</td>
                    <td>Rekomenduojami veiksmai</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>0-50</td>
                    <td>Oro kokybė normali, jokios rizikos/minimali</td>
                    <td>Grėsmės nėra, jokių papildomų veiksmų nereikia imtis</td>
                </tr>
                <tr>
                    <td>51-100</td>
                    <td>Oro kokybė priimtina, tačiau gali sukelti grėsmę, kurie yra jautrūs kietosioms dalelėms</td>
                    <td>Rizikos grupės žmonės turėtų praleisti mažiau laiko atvirose erdvėse</td>
                </tr>
                <tr>
                    <td>101-150</td>
                    <td>Rizikos grupės žmonės gali patirti pavojų, tačiau didžioji dauguma bus nepaveikta</td>
                    <td>Rizikos grupės žmonės turėtų praleisti mažiau laiko atvirose erdvėse</td>
                </tr>
                <tr>
                    <td>151-200</td>
                    <td>Visi žmonės gali patirti efektų, tačiau jautrūs žmonės juos patirs labiausiai</td>
                    <td>Aktyvūs/jautrūs žmonės turėtų stipriai sumažinti laiką praleistą atvirose erdvėse</td>
                </tr>
                <tr>
                    <td>201-300</td>
                    <td>Labai didelė grėsmė, visa populiacija bus paveikta</td>
                    <td>Venkite atvirų erdvių, likite patalpose</td>
                </tr>
                <tr>
                    <td>Virš 300</td>
                    <td>Visa populiacija patirs rimtą grėsmę gyvybei</td>
                    <td>Visi turi vengti atvirų erdvių, likite patalpose, nešiokite respiratorius</td>
                </tr>
            </tbody>
        </Table>
      </div>
    )
}

export default AirQualityLevels;