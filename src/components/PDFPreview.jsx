import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PDFPreview = ({ design, activatedModules = [] }) => {
  const { logo, primaryColor, secondaryColor, moduleOrder, modules, overviewLogic } = design;

  const renderModule = (moduleName) => {
    if (!modules[moduleName].active) return null;

    const moduleContent = {
      hvCheck: {
        title: "HV-CHECK",
        content: (
          <>
            <h3 className="text-lg font-semibold mb-2">Zustandprotokoll HV Sicherheit</h3>
            <div className="space-y-2">
              <div className="bg-green-500 text-white p-2 rounded">HV-System auffällig</div>
              <div className="bg-green-500 text-white p-2 rounded">Isolationswiderstände im Normalbereich</div>
              <div className="bg-red-500 text-white p-2 rounded">Fehlercodes gespeichert</div>
            </div>
            <h4 className="text-md font-semibold mt-4 mb-2">Batterieinformationen</h4>
            <p>State of Health (SOH): 96%</p>
            <p>Ladezustand (SOC): 90%</p>
            <p>max. Zellspannung: 4.2 V</p>
          </>
        )
      },
      evaluate: {
        title: "Evaluate",
        content: (
          <>
            <h3 className="text-lg font-semibold mb-2">Fahrzeugbewertung</h3>
            <div className="space-y-2">
              <div className="bg-yellow-500 text-white p-2 rounded">Gesamtzustand: Gut</div>
              <p>Kilometerstand: 50,000 km</p>
              <p>Batterie-Gesundheit: 92%</p>
              <p>Letzte Wartung: vor 6 Monaten</p>
            </div>
          </>
        )
      },
      workSafeGuided: {
        title: "workSafe Guided",
        content: (
          <>
            <h3 className="text-lg font-semibold mb-2">Sicherheitsprotokoll</h3>
            <div className="space-y-2">
              <div className="bg-green-500 text-white p-2 rounded">Alle Sicherheitsschritte abgeschlossen</div>
              <p>1. Fahrzeug gesichert</p>
              <p>2. Hochvolt-System deaktiviert</p>
              <p>3. Spannungsfreiheit geprüft</p>
              <p>4. Persönliche Schutzausrüstung angelegt</p>
            </div>
          </>
        )
      },
      mileageCheck: {
        title: "Mileage Check",
        content: (
          <>
            <h3 className="text-lg font-semibold mb-2">Kilometerstand-Überprüfung</h3>
            <div className="space-y-2">
              <div className="bg-green-500 text-white p-2 rounded">Kilometerstand plausibel</div>
              <p>Aktueller Stand: 50,000 km</p>
              <p>Letzter bekannter Stand: 49,500 km (vor 1 Monat)</p>
              <p>Durchschnittliche monatliche Fahrleistung: 500 km</p>
            </div>
          </>
        )
      }
    };

    const { title, content } = moduleContent[moduleName] || {};

    return (
      <Card key={moduleName} className="mb-4 shadow-sm">
        <CardHeader className="py-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
        </CardHeader>
        <CardContent className="py-2">
          {content}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="border-2 border-gray-300 p-4 rounded-lg" style={{ backgroundColor: secondaryColor, color: primaryColor }}>
      {logo && <img src={logo} alt="Company Logo" className="mb-4 max-w-full h-auto" />}
      <h2 className="text-2xl font-bold mb-4">Diagnostik-Bericht</h2>
      {moduleOrder.map((moduleName) => renderModule(moduleName))}
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Übersichts-Logik</h3>
        <p className="text-sm">{overviewLogic}</p>
      </div>
    </div>
  );
};

export default PDFPreview;
