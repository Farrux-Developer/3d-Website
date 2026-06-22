export interface PartData {
  id: string;
  name: string;
  description: string;
  material: string;
  powerDraw: string;
  status: 'optimal' | 'warning' | 'critical';
}

export const partsData: Record<string, PartData> = {
  core: {
    id: 'core',
    name: 'Quantum Core',
    description: 'The central power unit generating zero-point energy. It fluctuates constantly and requires heavy shielding.',
    material: 'Neutronium Alloy',
    powerDraw: '1.21 GW',
    status: 'optimal'
  },
  rings: {
    id: 'rings',
    name: 'Stabilization Rings',
    description: 'Magnetic confinement rings that keep the quantum core stable. Any misalignment can cause an anomaly.',
    material: 'Superconducting Titanium',
    powerDraw: '450 MW',
    status: 'warning'
  },
  shell: {
    id: 'shell',
    name: 'Outer Shell',
    description: 'The exterior protective casing designed to absorb excess radiation and temporal distortion.',
    material: 'Carbon-Nanotube Mesh',
    powerDraw: '10 MW',
    status: 'optimal'
  }
};
