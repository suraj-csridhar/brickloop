import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-primary text-primary-foreground">
            <div className="container mx-auto px-6 py-16">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                        <div className="lg:col-span-2 space-y-6">
                            <div>
                                <h3 className="text-2xl font-bold mb-2">Brickloop Advisors</h3>
                                <p className="text-sm opacity-80">A subsidiary of Hoysala Realtors</p>
                                <div className="w-20 h-1 bg-gradient-gold mt-4 rounded-full shadow-button"></div>
                            </div>
                            <p className="text-sm leading-relaxed opacity-90">
                                Bengaluru's premier builder-neutral real estate advisory firm. We provide zero-commission consultation for premium homes and micro-commercial properties, ensuring transparent and unbiased service to all our clients.
                            </p>
                            <div className="flex items-center gap-2 text-sm">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <span>Licensed Real Estate Advisory</span>
                            </div>
                        </div>
                        <div className="space-y-6">
                            <h4 className="text-lg font-semibold">Services</h4>
                            <ul className="space-y-3 text-sm">
                                <li><a href="#" className="opacity-80 hover:opacity-100 transition-opacity">Premium Residential</a></li>
                                <li><a href="#" className="opacity-80 hover:opacity-100 transition-opacity">Micro-Commercial</a></li>
                                <li><a href="#" className="opacity-80 hover:opacity-100 transition-opacity">Property Research</a></li>
                                <li><a href="#" className="opacity-80 hover:opacity-100 transition-opacity">Legal Due Diligence</a></li>
                                <li><a href="#" className="opacity-80 hover:opacity-100 transition-opacity">Financial Advisory</a></li>
                                <li><a href="#" className="opacity-80 hover:opacity-100 transition-opacity">End-to-End Support</a></li>
                            </ul>
                        </div>
                        <div className="space-y-6">
                            <h4 className="text-lg font-semibold">Contact Info</h4>
                            <div className="space-y-4 text-sm">
                                <div className="flex items-start gap-3">
                                    <MapPin className="w-4 h-4 mt-1 opacity-80" />
                                    <div>
                                        <div>123 Brigade Road</div>
                                        <div>Bengaluru, Karnataka 560001</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Phone className="w-4 h-4 opacity-80" />
                                    <span>+91 98765 43210</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Mail className="w-4 h-4 opacity-80" />
                                    <span>info@brickloop.com</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Clock className="w-4 h-4 mt-1 opacity-80" />
                                    <div>
                                        <div>Mon - Sat: 9:00 AM - 7:00 PM</div>
                                        <div>Sunday: 10:00 AM - 5:00 PM</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-primary-foreground/20 pt-8">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <div className="text-sm opacity-80">
                                &copy; {currentYear} Brickloop Advisors. A subsidiary of Hoysala Realtors. All rights reserved.
                            </div>
                            <div className="flex gap-6 text-sm">
                                <a href="#" className="opacity-80 hover:opacity-100 transition-opacity">Privacy Policy</a>
                                <a href="#" className="opacity-80 hover:opacity-100 transition-opacity">Terms of Service</a>
                                <a href="#" className="opacity-80 hover:opacity-100 transition-opacity">RERA Compliance</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;