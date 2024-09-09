import React from 'react';

const PDFPreview = ({ selectedModules }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">PDF Preview</h2>
      <div className="border-2 border-gray-300 p-4 rounded-lg">
        <div className="bg-gray-100 p-2 mb-2 rounded">
          <h3 className="font-bold">HV-CHECK</h3>
          <p className="text-sm">Zustandprotokoll HV Sicherheit</p>
        </div>
        
        {selectedModules.carAndReportBasicInfo && (
          <div className="bg-gray-100 p-2 mb-2 rounded">
            <h4 className="font-semibold">Prüfdaten</h4>
            <p className="text-sm">Datum: 23.02.2023</p>
            <p className="text-sm">Protokoll-Nr: HV-2023-0001-123</p>
            <h4 className="font-semibold mt-2">Fahrzeugdaten</h4>
            <p className="text-sm">Marke: Volkswagen</p>
            <p className="text-sm">Modell: ID.Buzz</p>
            <p className="text-sm">Kilometerstand: 23.741 km</p>
            <p className="text-sm">VIN: SYJS1A1D3KPF14705</p>
          </div>
        )}
        
        {selectedModules.compactOverview && (
          <div className="bg-gray-100 p-2 mb-2 rounded">
            <h4 className="font-semibold">Prüfergebnis - Übersicht</h4>
            <div className="bg-green-500 text-white p-2 rounded mt-2">HV-System auffällig</div>
            <div className="bg-green-500 text-white p-2 rounded mt-2">Isolationswiderstände im Normalbereich</div>
            <div className="bg-red-500 text-white p-2 rounded mt-2">Fehlercodes gespeichert</div>
          </div>
        )}
        
        {selectedModules.safetyValues && (
          <div className="bg-gray-100 p-2 mb-2 rounded">
            <h4 className="font-semibold">Sicherheitsindikatoren</h4>
            <p className="text-sm">Isolationswiderstand: 10.903 kOhm</p>
            <p className="text-sm">HV-System: nicht aktiv</p>
            <p className="text-sm">Status Spannungsfreiheit: nicht aktiv</p>
          </div>
        )}
        
        {selectedModules.batteryValues && (
          <div className="bg-gray-100 p-2 mb-2 rounded">
            <h4 className="font-semibold">Batterieinformationen</h4>
            <p className="text-sm">State of Health (SOH): 96%</p>
            <p className="text-sm">Ladezustand (SOC): 90%</p>
            <p className="text-sm">max. Zellspannung: 4.2 V</p>
          </div>
        )}
        
        {selectedModules.troubleCodes && (
          <div className="bg-gray-100 p-2 mb-2 rounded">
            <h4 className="font-semibold">Fehlercodes</h4>
            <p className="text-sm">P0A1F00 5645EFG: Steuergerät für Batterieenergiemanagement Fehlfunktion</p>
            <p className="text-sm">P0C8F00 5670FPG: Geber 10 für Temperatur für Hybrid-/Hochvoltbatterie Kurzschluss nach Masse</p>
          </div>
        )}
        
        {selectedModules.disclaimer && (
          <div className="bg-gray-100 p-2 mb-2 rounded">
            <p className="text-xs italic">Bei allen angegebenen Werten handelt es sich um Daten aus den Steuergeräten des Fahrzeugs. Die Ermittlung der Zustände der Isolationswiderstände erfolgt entsprechend den UN ECE R100 Grenzwerten. Für automatische Sicherheitssysteme ist entsprechendes zertifiziertes Messequipment notwendig.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PDFPreview;