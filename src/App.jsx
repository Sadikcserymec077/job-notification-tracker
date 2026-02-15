import { useState } from 'react'

function App() {
  const [proofs, setProofs] = useState({
    uiBuilt: false,
    logicWorking: false,
    testPassed: false,
    deployed: false
  })

  const toggleProof = (key) => {
    setProofs(prev => ({...prev, [key]: !prev[key]}))
  }

  return (
    <div className="layout-root">
      {/* GLOBAL LAYOUT: Top Bar -> Context Header -> Workspace -> Footer */}
      
      {/* 1. TOP BAR */}
      <header className="top-bar border-b bg-surface flex items-center justify-between px-6 py-3 sticky top-0 z-50">
        <div className="font-serif font-bold text-lg text-primary">
          KodNest Premium Build System
        </div>
        
        <div className="flex items-center gap-2 text-sm text-secondary font-medium">
          <span className="text-muted">Step 2</span>
          <span className="text-muted">/</span>
          <span>5</span>
        </div>

        <div>
          <span className="badge badge-progress" style={{ backgroundColor: '#FFF3E0', color: '#D97706', padding: '4px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: 'bold' }}>
            In Progress
          </span>
        </div>
      </header>

      <main className="main-content flex flex-col items-center py-10 px-6 pb-32">
        <div className="w-full max-w-7xl">
          
          {/* 2. CONTEXT HEADER */}
          <section className="mb-12 text-center">
            <h1 className="text-4xl font-serif text-primary mb-3">
              Configure Your Environment
            </h1>
            <p className="text-lg text-secondary mx-auto max-w-2xl">
              Define the core parameters for your new SaaS application. 
              Efficiency is the goal, precision is the method.
            </p>
          </section>

          {/* 3. WORKSPACE SPLIT */}
          <div className="flex gap-8 items-start">
            
            {/* PRIMARY WORKSPACE (70%) */}
            <div className="flex-1 w-full" style={{ flex: '7' }}>
              <div className="card bg-surface p-8 space-y-8">
                <div>
                  <h3 className="text-xl font-serif mb-4">Project Parameters</h3>
                  <div className="grid gap-6">
                    <div>
                      <label className="block text-sm font-medium text-secondary mb-2">
                        Application Name
                      </label>
                      <input 
                        type="text" 
                        className="input w-full" 
                        placeholder="e.g. Acme Analytics"
                        defaultValue="KodNest Build System"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                      <div>
                        <label className="block text-sm font-medium text-secondary mb-2">
                          Domain
                        </label>
                        <input 
                          type="text" 
                          className="input w-full" 
                          placeholder="acme.com" 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-secondary mb-2">
                          Environment
                        </label>
                        <select className="input w-full">
                          <option>Production</option>
                          <option>Staging</option>
                          <option>Development</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <h3 className="text-xl font-serif mb-4">Resource Allocation</h3>
                  <div className="flex gap-4">
                    <button className="btn btn-secondary flex-1">Standard</button>
                    <button className="btn btn-primary flex-1">Premium High-Performance</button>
                    <button className="btn btn-secondary flex-1">Enterprise</button>
                  </div>
                </div>
              </div>
            </div>

            {/* SECONDARY PANEL (30%) */}
            <aside className="w-full sticky top-24" style={{ flex: '3' }}>
              <div className="card bg-surface p-6 space-y-6">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-secondary mb-3">
                    Instruction
                  </h4>
                  <p className="text-sm text-secondary leading-relaxed">
                    Review the configuration carefully. Once verified, use the prompts below to generate the initial infrastructure code.
                  </p>
                </div>

                <div className="p-4 bg-gray-50 border rounded text-sm font-mono text-secondary break-all">
                  npx create-kodnest-app@latest --premium
                </div>

                <div className="flex flex-col gap-3">
                  <button className="btn btn-copy w-full justify-between group">
                    <span>Copy Command</span>
                    <span className="opacity-50 group-hover:opacity-100">⌘C</span>
                  </button>
                  <button className="btn btn-primary w-full">
                    Build in Lovable
                  </button>
                  <div className="flex gap-2">
                    <button className="btn btn-secondary flex-1">It Worked</button>
                    <button className="btn btn-secondary flex-1 text-red-700 border-red-200 hover:border-red-700">Error</button>
                  </div>
                </div>
              </div>
            </aside>

          </div>
        </div>
      </main>

      {/* 4. PROOF FOOTER */}
      <footer className="fixed bottom-0 left-0 right-0 bg-surface border-t py-4 px-6 z-40 shadow-sm" style={{ boxShadow: '0 -2px 10px rgba(0,0,0,0.03)' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-sm font-medium text-secondary">
            Systems Check
          </div>
          
          <div className="flex gap-8">
            {Object.entries(proofs).map(([key, value]) => (
              <label key={key} className="flex items-center gap-2 cursor-pointer select-none group">
                <div 
                  className={`w-5 h-5 border rounded flex items-center justify-center transition-colors ${value ? 'bg-success border-success' : 'border-gray-300 bg-white'}`}
                  style={{ 
                    backgroundColor: value ? 'var(--color-success)' : 'white',
                    borderColor: value ? 'var(--color-success)' : '#E5E5E5'
                  }}
                >
                  {value && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <input 
                  type="checkbox" 
                  className="hidden" 
                  checked={value} 
                  onChange={() => toggleProof(key)} 
                />
                <span className={`text-sm transition-colors ${value ? 'text-primary font-medium' : 'text-secondary'}`}>
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </span>
              </label>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
