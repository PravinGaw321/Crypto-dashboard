import * as React from 'react';
import Accordion, { accordionClasses } from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails, {
    accordionDetailsClasses,
} from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Fade from '@mui/material/Fade';

export default function Description() {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpansion = () => {
        setExpanded((prevExpanded) => !prevExpanded);
    };

    return (
        <div>
            <Accordion
                expanded={expanded}
                onChange={handleExpansion}
                slots={{ transition: Fade }}
                slotProps={{ transition: { timeout: 400 } }}
                sx={[
                    expanded
                        ? {
                            [`& .${accordionClasses.region}`]: {
                                height: 'auto',
                            },
                            [`& .${accordionDetailsClasses.root}`]: {
                                display: 'block',
                            },
                        }
                        : {
                            [`& .${accordionClasses.region}`]: {
                                height: 0,
                            },
                            [`& .${accordionDetailsClasses.root}`]: {
                                display: 'none',
                            },
                        },
                ]}
                style={{ marginBottom: '15px' }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <Typography component="span">Purpose of Cryptocurrency</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 2 }}>
                    <Typography sx={{ fontSize: "13px" }}>
                        The primary purpose of cryptocurrency is to provide a decentralized, secure, and transparent digital currency system that operates independently of central authorities, enabling users to have full control over their financial transactions.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                >
                    <Typography component="span">Usage of Cryptocurrency</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 2 }}>
                    <Typography sx={{ fontSize: "13px" }}>
                        <ul style={{ padding: '10px', paddingTop: "4px" }}>
                            <li>
                                Digital Payments: Facilitating fast, secure, and borderless peer-to-peer transactions.
                            </li>
                            <li>
                                Investment: Acting as a store of value and speculative asset.
                            </li>
                            <li>
                                Smart Contracts: Automating agreements without intermediaries.
                            </li>
                            <li>
                                Decentralized Applications (DApps): Powering applications on blockchain platforms.
                            </li>
                            <li>
                                Remittances: Enabling cost-effective international money transfers.
                            </li>
                            <li>
                                Tokenization: Representing ownership of digital or physical assets.
                            </li>

                        </ul>
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}