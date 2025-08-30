import React from 'react';
import { Button } from './ui/button';
import { House, Building2, Search, FileText, Calculator, Handshake } from 'lucide-react';

const services = [
    {
        icon: House,
        title: 'Premium Residential',
        description: 'Luxury apartments, villas, and penthouses across prime Bengaluru locations.',
        features: ['2BHK to 5BHK apartments', 'Independent villas', 'Luxury penthouses', 'Gated communities'],
    },
    {
        icon: Building2,
        title: 'Micro-Commercial',
        description: 'Small office spaces, retail outlets, and commercial properties for businesses.',
        features: ['Office spaces', 'Retail showrooms', 'Co-working spaces', 'Commercial plots'],
    },
    {
        icon: Search,
        title: 'Property Research',
        description: 'Comprehensive market analysis and property evaluation services.',
        features: ['Market research', 'Price analysis', 'Location scoring', 'ROI calculations'],
    },
    {
        icon: FileText,
        title: 'Legal Due Diligence',
        description: 'Complete legal verification and documentation support.',
        features: ['Title verification', 'Approvals check', 'Document review', 'Legal clearance'],
    },
    {
        icon: Calculator,
        title: 'Financial Advisory',
        description: 'Home loan assistance and investment planning guidance.',
        features: ['Loan processing', 'EMI calculations', 'Tax benefits', 'Investment advice'],
    },
    {
        icon: Handshake,
        title: 'End-to-End Support',
        description: 'Complete assistance from property search to final possession.',
        features: ['Site visits', 'Negotiation support', 'Registration help', 'Post-sale service'],
    },
];

const Services = () => {
    const handleScrollToContact = () => {
        document.getElementById('contact-form')?.scrollInView({ behavior: 'smooth' });
    };

    return (
        <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center space-y-6 mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-primary">
                            Our <span className="bg-gradient-gold bg-clip-text text-transparent">Services</span>
                        </h2>
                        <div className="w-32 h-1 bg-gradient-gold mx-auto rounded-full shadow-button"></div>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                            Comprehensive real estate solutions tailored to your needs, backed by our commitment to transparency and excellence.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <div key={index} className="group bg-card rounded-2xl p-8 shadow-card hover:shadow-luxury transition-all duration-300 hover:-translate-y-2">
                                <div className="space-y-6">
                                    <div className="w-16 h-16 bg-gradient-gold rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-button">
                                        <service.icon className="w-8 h-8 text-accent-foreground" />
                                    </div>
                                    <div className="space-y-3">
                                        <h3 className="text-xl font-semibold text-primary">{service.title}</h3>
                                        <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                                    </div>
                                    <ul className="space-y-2">
                                        {service.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-center gap-3 text-sm">
                                                <div className="w-1.5 h-1.5 bg-gradient-gold rounded-full shadow-sm"></div>
                                                <span className="text-foreground">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-16">
                        <Button variant="premium" size="lg" onClick={handleScrollToContact} className="text-lg px-8 py-4">
                            Discuss Your Requirements
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;