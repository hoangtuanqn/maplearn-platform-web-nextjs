"use client";
import React from "react";
import { Playfair_Display, Inter, Dancing_Script } from "next/font/google";

// Font config
const playfairDisplay = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "600", "700", "900"],
});

const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const dancingScript = Dancing_Script({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const Certificate = ({
    fullName,
    eventName,
    eventDate,
}: {
    fullName: string;
    eventName: string;
    eventDate: string;
}) => {
    return (
        <>
            <style
                dangerouslySetInnerHTML={{
                    __html: `
                .certificate {
                    width: 100%;
                    max-width: 1200px;
            
                    background: linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #e8f4fd 100%);
                    border: 12px solid transparent;
                    border-image: linear-gradient(45deg, #1e40af, #3b82f6, #06b6d4, #1e40af) 1;
                    box-shadow: 
                        0 20px 60px rgba(30, 64, 175, 0.1),
                        inset 0 1px 0 rgba(255,255,255,0.8);
                    padding: 60px 80px;
                    text-align: center;
                    position: relative;
                    overflow: hidden;
                    background-image: 
                        url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e0f2fe' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
                    border-radius: 16px;
                }
                
                .certificate::before {
                    content: '';
                    position: absolute;
                    top: 30px;
                    left: 30px;
                    right: 30px;
                    bottom: 30px;
                    border: 3px solid rgba(30, 64, 175, 0.15);
                    border-radius: 12px;
                    pointer-events: none;
                }
                
                .certificate::after {
                    content: '';
                    position: absolute;
                    top: 45px;
                    left: 45px;
                    right: 45px;
                    bottom: 45px;
                    border: 1px solid rgba(59, 130, 246, 0.2);
                    border-radius: 8px;
                    pointer-events: none;
                }
                
                .certificate-content {
                    position: relative;
                    z-index: 2;
                    display: grid;
                    grid-template-columns: 1fr 250px;
                    gap: 40px;
                    align-items: center;
                    height: 100%;
                    min-height: 600px;
                }
                
                .certificate-main {
                    text-align: left;
                    padding-right: 20px;
                }
                
                .certificate-sidebar {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    border-left: 2px solid rgba(30, 64, 175, 0.1);
                    padding-left: 30px;
                }
                
                .header {
                    margin-bottom: 40px;
                }
                
                .main-title {
                    font-size: 56px;
                    font-weight: 900;
                    background: linear-gradient(135deg, #1e40af, #3b82f6, #0ea5e9);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    margin: 0 0 10px 0;
                    letter-spacing: 6px;
                    text-transform: uppercase;
                    line-height: 0.9;
                }
                
                .subtitle {
                    font-size: 28px;
                    color: #475569;
                    margin: 0;
                    font-weight: 700;
                    letter-spacing: 4px;
                    text-transform: uppercase;
                }
                
                .ministry-text {
                    font-size: 14px;
                    color: #64748b;
                    margin-bottom: 30px;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }
                
                .presented-to {
                    font-size: 18px;
                    color: #475569;
                    margin: 20px 0 15px 0;
                    font-weight: 500;
                }
                
                .student-name {
                    font-size: 48px;
                    margin: 15px 0 25px 0;
                    font-weight: 700;
                    background: linear-gradient(135deg, #1e293b, #1e40af);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    line-height: 1.1;
                    border-bottom: 3px solid #1e40af;
                    padding-bottom: 10px;
                    display: inline-block;
                }
                
                .achievement-text {
                    font-size: 18px;
                    color: #475569;
                    line-height: 1.7;
                    margin: 25px 0;
                    max-width: 700px;
                }
                
                .course-name {
                    color: #1e40af;
                    font-weight: 700;
                    font-size: 20px;
                }
                
                .date-location {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 20px;
                    margin: 30px 0;
                }
                
                .date-item {
                    padding: 15px 20px;
                    background: rgba(255, 255, 255, 0.7);
                    border-radius: 10px;
                    border: 1px solid rgba(30, 64, 175, 0.15);
                }
                
                .date-label {
                    font-size: 12px;
                    color: #64748b;
                    margin-bottom: 5px;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }
                
                .date-value {
                    font-size: 16px;
                    color: #1e293b;
                    font-weight: 700;
                }
                
                .logo-container {
                    margin-bottom: 30px;
                }
                
                .logo {
                    width: 120px;
                    height: 120px;
                    background: linear-gradient(135deg, #1e40af, #3b82f6);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto;
                    box-shadow: 
                        0 15px 35px rgba(30, 64, 175, 0.2),
                        inset 0 1px 0 rgba(255, 255, 255, 0.3);
                    border: 6px solid white;
                }
                
                .logo-text {
                    color: white;
                    font-size: 24px;
                    font-weight: 900;
                    letter-spacing: 2px;
                }
                
                .platform-name {
                    font-size: 16px;
                    color: #1e40af;
                    font-weight: 700;
                    margin: 15px 0;
                    letter-spacing: 1px;
                }
                
                .qr-placeholder {
                    width: 100px;
                    height: 100px;
                    background: linear-gradient(45deg, #f1f5f9, #e2e8f0);
                    border: 2px solid #cbd5e1;
                    border-radius: 8px;
                    margin: 20px auto;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 12px;
                    color: #64748b;
                    text-align: center;
                    line-height: 1.3;
                }
                
                .verification-text {
                    font-size: 11px;
                    color: #64748b;
                    margin-top: 10px;
                    line-height: 1.4;
                }
                
                .signatures {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 40px;
                    justify-items: center;
                    margin-top: 40px;
                    padding-top: 30px;
                    border-top: 2px solid rgba(30, 64, 175, 0.1);
                }
                
                .signature {
                    text-align: center;
                }
                
                .signature-image {
                    height: 40px;
                    object-fit: contain;
                    margin-bottom: 8px;
                    filter: contrast(1.2);
                }
                
                .signature-line {
                    border-top: 2px solid #cbd5e1;
                    margin: 8px auto 12px;
                    width: 150px;
                }
                
                .signature-name {
                    font-weight: 700;
                    color: #1e293b;
                    font-size: 14px;
                    margin-bottom: 4px;
                }
                
                .signature-title {
                    font-size: 11px;
                    color: #64748b;
                    font-weight: 500;
                    letter-spacing: 0.5px;
                }
                
                .watermark {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%) rotate(-45deg);
                    font-size: 150px;
                    color: rgba(30, 64, 175, 0.02);
                    font-weight: 900;
                    pointer-events: none;
                    z-index: 0;
                    letter-spacing: 10px;
                }
                
                .grade-badge {
                    display: inline-block;
                    background: linear-gradient(135deg, #059669, #10b981);
                    color: white;
                    padding: 8px 16px;
                    border-radius: 20px;
                    font-size: 14px;
                    font-weight: 700;
                    margin: 10px 0;
                    letter-spacing: 1px;
                }

                
                @media (max-width: 1024px) {
                    .certificate-content {
                        grid-template-columns: 1fr;
                        gap: 30px;
                        text-align: center;
                    }
                    
                    .certificate-main {
                        text-align: center;
                        padding-right: 0;
                    }
                    
                    .certificate-sidebar {
                        border-left: none;
                        border-top: 2px solid rgba(30, 64, 175, 0.1);
                        padding-left: 0;
                        padding-top: 30px;
                    }
                    
                    .main-title {
                        font-size: 42px;
                    }
                    
                    .student-name {
                        font-size: 36px;
                    }
                }
                    .seal {
                    width: 100px;
                    height: 100px;
                    background: linear-gradient(135deg, #10b981, #059669);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto;
                    box-shadow: 
                        0 15px 35px rgba(5, 150, 105, 0.2),
                        inset 0 1px 0 rgba(255, 255, 255, 0.3);
                    border: 6px solid white;
                    flex-direction: column;
                    color: white;
                }
              
            `,
                }}
            />
            <div className="certificate">
                <div className="watermark">MAPLEARN</div>
                <div className="content">
                    {/* Header */}
                    <div className="header">
                        <h1 className={`${playfairDisplay.className} main-title`}>CERTIFICATE</h1>
                        <h2 className={`${inter.className} subtitle`}>OF COMPLETION</h2>
                    </div>

                    {/* Presented to */}
                    <div className={`${inter.className} presented-to`}>This certificate is proudly presented to</div>

                    {/* Student Name */}
                    <div className={`${dancingScript.className} student-name`}>{fullName}</div>

                    {/* Achievement Text */}
                    <div className={`${inter.className} achievement-text`}>
                        for successfully completing the course
                        <br />
                        <span className="course-name">&ldquo;{eventName}&rdquo;</span>
                        <br />
                        and demonstrating exceptional dedication to learning and professional development
                    </div>

                    {/* Date Section */}
                    <div className={`${inter.className} date-section`}>
                        <div className="date-label">Date of Completion</div>
                        <div className="date-value">{eventDate}</div>
                    </div>

                    {/* Seal */}
                    <div className="seal-container">
                        <div className="seal">
                            <div className="seal-icon">✓</div>
                            <div className={`${inter.className} seal-text`}>Verified</div>
                        </div>
                    </div>

                    {/* Signatures */}
                    <div className="signatures">
                        <div className="signature">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/2/27/Narf_signature.png"
                                alt="Instructor Signature"
                                width={200}
                                height={50}
                                className="signature-image"
                            />
                            <div className="signature-line" />
                            <div className={`${inter.className} signature-name`}>Dr. Sarah Johnson</div>
                            <div className={`${inter.className} signature-title`}>Course Instructor</div>
                        </div>
                        <div className="signature">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/2/27/Narf_signature.png"
                                alt="Director Signature"
                                width={200}
                                height={50}
                                className="signature-image"
                            />
                            <div className="signature-line" />
                            <div className={`${inter.className} signature-name`}>Michael Chen</div>
                            <div className={`${inter.className} signature-title`}>Academic Director</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Certificate;
