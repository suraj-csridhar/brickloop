import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, Shield, Users } from 'lucide-react';

const Hero = () => {
    const handleScrollToContact = () => {
        document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="relative min-h-screen flex items-center bg-gradient-hero overflow-hidden">
            <div className="absolute inset-0">
                <img
                    src="/assets/img/residential-towers.jpg"
                    alt="Premium Residential Towers"
                    className="w-full h-full object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-hero opacity-80"></div>
            </div>
            <div className="relative z-10 container mx-auto px-6 text-center text-primary-foreground">
                <div className="max-w-4xl mx-auto space-y-8">
                    <div className="space-y-4">
                        <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                            Brickloop <span className="bg-gradient-gold bg-clip-text text-transparent">Advisors</span>
                        </h1>
                        <p className="text-xl md:text-2xl font-light opacity-90">
                            A subsidiary of <span className="text-secondary font-medium">Hoysala Realtors</span>
                        </p>
                        <div className="w-32 h-1 bg-gradient-gold mx-auto rounded-full shadow-button"></div>
                    </div>
                    <div className="space-y-6">
                        <h2 className="text-2xl md:text-3xl font-medium">
    Bengaluru's Premier <span className="bg-gradient-gold bg-clip-text text-transparent font-semibold">Builder-Neutral</span> Real Estate Advisory
</h2>
                        <p className="text-lg md:text-xl opacity-80 max-w-3xl mx-auto leading-relaxed">
                            No Commissions, Direct-Value creation through discounts and Cashbacks, builder-neutral advisory; We work directly with developers, and help you secure cash-backs, and discounts, ensuring you get the best deal on your next residential property, or commercial real estate
                        </p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-6 pt-4">
                        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                            <Shield className="w-5 h-5 text-secondary" />
                            <span className="text-sm font-medium">Builder Neutral</span>
                        </div>
                        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                            <Users className="w-5 h-5 text-secondary" />
                            <span className="text-sm font-medium">Zero Commission</span>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
                        <Button variant="hero" size="lg" onClick={handleScrollToContact} className="text-lg px-8 py-4">
                            Get Free Consultation <ArrowRight className="ml-2" />
                        </Button>
                        <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm">
                            View Properties
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;