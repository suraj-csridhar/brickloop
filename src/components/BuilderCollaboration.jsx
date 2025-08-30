import React from 'react';
import { Button } from './ui/button';
import { Building2, Star, CircleCheckBig, MapPin } from 'lucide-react';

const developerPartners = [
    { name: 'Sobha Limited', projects: '12+ Projects', rating: '4.8' },
    { name: 'Birla Estates', projects: '8+ Projects', rating: '4.7' },
    { name: 'Nambiar Builders', projects: '15+ Projects', rating: '4.6' },
    { name: 'Lodha Group', projects: '6+ Projects', rating: '4.9' },
    { name: 'Prestige Group', projects: '20+ Projects', rating: '4.8' },
    { name: 'Brigade Group', projects: '18+ Projects', rating: '4.7' },
];

const projectLocations = [
    {
        area: 'South Bengaluru',
        description: 'Premium localities like Koramangala, BTM Layout, Bannerghatta Road',
        projects: '35+ Active Projects',
        priceRange: '₹80L - ₹3Cr',
        highlights: ['Tech corridors', 'Established infrastructure', 'Premium amenities'],
    },
    {
        area: 'North Bengaluru',
        description: 'Emerging areas like Yelahanka, Hebbal, Thanisandra',
        projects: '28+ Active Projects',
        priceRange: '₹60L - ₹2.5Cr',
        highlights: ['Airport connectivity', 'Rapid development', 'Value appreciation'],
    },
    {
        area: 'East Bengaluru',
        description: 'IT hubs like Whitefield, Marathahalli, Sarjapur Road',
        projects: '42+ Active Projects',
        priceRange: '₹70L - ₹4Cr',
        highlights: ['IT proximity', 'Modern infrastructure', 'High ROI potential'],
    },
];

const BuilderCollaboration = () => {
    const handleScrollToContact = () => {
        document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center space-y-6 mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-primary">
                            Builder <span className="bg-gradient-gold bg-clip-text text-transparent">Collaborations</span>
                        </h2>
                        <div className="w-32 h-1 bg-gradient-gold mx-auto rounded-full shadow-button"></div>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                            Access premium projects from Bengaluru's most trusted developers. Our partnerships ensure you get the best deals across South, North, and East Bengaluru.
                        </p>
                    </div>
                    <div className="mb-20">
                        <h3 className="text-2xl font-bold text-primary text-center mb-12">Our Trusted Developer Partners</h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {developerPartners.map((partner, index) => (
                                <div key={index} className="group bg-card rounded-2xl p-6 shadow-card hover:shadow-luxury transition-all duration-300 hover:-translate-y-1">
                                    <div className="space-y-4">
                                        <div className="w-12 h-12 bg-gradient-gold rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-button">
                                            <Building2 className="w-6 h-6 text-accent-foreground" />
                                        </div>
                                        <div className="space-y-2">
                                            <h4 className="text-lg font-semibold text-primary">{partner.name}</h4>
                                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                <span>{partner.projects}</span>
                                                <div className="flex items-center gap-1">
                                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                    <span>{partner.rating}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-green-600">
                                            <CircleCheckBig className="w-4 h-4" />
                                            <span>Verified Partner</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-8">
                        <h3 className="text-2xl font-bold text-primary text-center mb-12">Premium Projects Across Bengaluru</h3>
                        <div className="grid lg:grid-cols-3 gap-8">
                            {projectLocations.map((location, index) => (
                                <div key={index} className="bg-gradient-card rounded-2xl p-8 shadow-luxury hover:shadow-xl transition-all duration-300">
                                    <div className="space-y-6">
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gradient-gold rounded-full flex items-center justify-center shadow-button">
                                                    <MapPin className="w-5 h-5 text-accent-foreground" />
                                                </div>
                                                <h4 className="text-xl font-bold text-primary">{location.area}</h4>
                                            </div>
                                            <p className="text-muted-foreground leading-relaxed">{location.description}</p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="text-center p-3 bg-muted/50 rounded-lg">
                                                <div className="text-lg font-bold text-primary">{location.projects}</div>
                                                <div className="text-xs text-muted-foreground">Available</div>
                                            </div>
                                            <div className="text-center p-3 bg-muted/50 rounded-lg">
                                                <div className="text-lg font-bold text-primary">{location.priceRange}</div>
                                                <div className="text-xs text-muted-foreground">Price Range</div>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <h5 className="font-semibold text-primary text-sm">Key Highlights</h5>
                                            <ul className="space-y-1">
                                                {location.highlights.map((highlight, idx) => (
                                                    <li key={idx} className="flex items-center gap-2 text-sm">
                                                        <div className="w-1.5 h-1.5 bg-gradient-gold rounded-full shadow-sm"></div>
                                                        <span className="text-foreground">{highlight}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="text-center mt-16 space-y-6">
                        <div className="bg-primary/5 rounded-2xl p-8">
                            <div className="flex flex-wrap justify-center gap-8 text-center">
                                <div>
                                    <div className="text-3xl font-bold text-primary">100+</div>
                                    <div className="text-sm text-muted-foreground">Active Projects</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-primary">15+</div>
                                    <div className="text-sm text-muted-foreground">Builder Partners</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-primary">₹2000Cr+</div>
                                    <div className="text-sm text-muted-foreground">Portfolio Value</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button variant="premium" size="lg" onClick={handleScrollToContact} className="text-lg px-8 py-4">
                                Explore Projects
                            </Button>
                            <Button variant="outline" size="lg" onClick={handleScrollToContact} className="text-lg px-8 py-4">
                                Schedule Site Visits
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BuilderCollaboration;