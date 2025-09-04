import { Guide } from '../types';

export const guides: Guide[] = [
  {
    guideId: '1',
    title: 'Know Your Rights During Police Stops',
    state: 'general',
    language: 'en',
    content: `
**Your Constitutional Rights:**

**1. Right to Remain Silent**
- You have the right to remain silent
- Anything you say can be used against you
- Simply say: "I am exercising my right to remain silent"

**2. Right to Refuse Searches**
- Police need a warrant or probable cause
- Say: "I do not consent to any searches"
- Keep your hands visible at all times

**3. Right to an Attorney**
- You can request a lawyer at any time
- Say: "I want to speak to my attorney"
- Do not answer questions without legal representation

**What TO DO:**
✅ Stay calm and polite
✅ Keep your hands visible
✅ Ask if you're free to leave
✅ Record the interaction if safe to do so
✅ Remember officer badge numbers and details

**What NOT to say:**
❌ Don't argue or resist physically
❌ Don't consent to searches
❌ Don't make sudden movements
❌ Don't provide false information
❌ Don't discuss your case details

**Important Scripts:**
- "Am I free to leave?"
- "I am exercising my right to remain silent"
- "I do not consent to any searches"
- "I want to speak to my attorney"
    `
  },
  {
    guideId: '2',
    title: 'Conoce Tus Derechos Durante Paradas Policiales',
    state: 'general',
    language: 'es',
    content: `
**Tus Derechos Constitucionales:**

**1. Derecho a Permanecer en Silencio**
- Tienes derecho a permanecer en silencio
- Todo lo que digas puede ser usado en tu contra
- Simplemente di: "Estoy ejerciendo mi derecho a permanecer en silencio"

**2. Derecho a Rechazar Búsquedas**
- La policía necesita una orden o causa probable
- Di: "No consiento a ninguna búsqueda"
- Mantén tus manos visibles en todo momento

**3. Derecho a un Abogado**
- Puedes solicitar un abogado en cualquier momento
- Di: "Quiero hablar con mi abogado"
- No respondas preguntas sin representación legal

**Qué HACER:**
✅ Mantente calmado y cortés
✅ Mantén tus manos visibles
✅ Pregunta si puedes irte
✅ Graba la interacción si es seguro hacerlo
✅ Recuerda números de placa y detalles del oficial

**Qué NO decir:**
❌ No discutas o resistas físicamente
❌ No consientas a búsquedas
❌ No hagas movimientos repentinos
❌ No proporciones información falsa
❌ No discutas detalles de tu caso

**Frases Importantes:**
- "¿Puedo irme?"
- "Estoy ejerciendo mi derecho a permanecer en silencio"
- "No consiento a ninguna búsqueda"
- "Quiero hablar con mi abogado"
    `
  }
];

export const getGuideByStateAndLanguage = (state: string, language: 'en' | 'es'): Guide => {
  return guides.find(g => g.state === state && g.language === language) || guides[0];
};
